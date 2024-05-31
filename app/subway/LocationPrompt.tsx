'use client';

// components/LocationPrompt.tsx
import React, { useState, useEffect } from 'react';
import { Spinner, trainComponentMap } from './SubwayComponents';

interface Location {
  lat: number;
  lng: number;
}

interface Train {
  arrivalTime: string;
  routeId: string;
  tripId: string;
  trainOrder: number;
  stopId: string;
}

interface Station {
  stopName: string;
  stopId: string;
  distance: number;
  trains: Train[];
}

interface ApiResponse {
  message: string;
  stops: Station[];
}

function sortStations(stations: Station[]): Station[] {
  stations.sort((a, b) => {
    if (a.distance !== b.distance) {
      return a.distance - b.distance;
    }

    if (a.stopName === b.stopName) {
      const lastCharA = a.stopId.slice(-1);
      const lastCharB = b.stopId.slice(-1);

      if (lastCharA === 'N' && lastCharB === 'S') {
        return -1; // a before b
      } else if (lastCharA === 'S' && lastCharB === 'N') {
        return 1; // b before a
      }
    }

    return 0;
  });
  return stations;
}

const LocationPrompt: React.FC = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [nearestStations, setNearestStations] = useState<Station[]>([]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location: ', error);
        },
      );
    } else {
      console.error('Geolocation is not available.');
    }
  }, []);

  useEffect(() => {
    if (location) {
      const findNearestStations = async () => {
        try {
          const body = JSON.stringify({
            lat: location.lat,
            long: location.lng,
          });
          const response = await fetch(`/subway/api`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            next: { revalidate: 0 },
            body,
          });
          const data: ApiResponse = await response.json();
          const stations = data.stops;
          setNearestStations(sortStations(stations));
        } catch (error) {
          console.error('Error finding nearest stations: ', error);
        }
      };

      findNearestStations();
    }
  }, [location]);

  return (
    <div>
      <div className="flex justify-center items-center w-full h-10 bg-gray-200 text-center text-4xl font-bold text-gray-800 py-12">
        Nearest Subway Stations
      </div>
      <div className="w-full p-4 pb-0">
        {location && !nearestStations && (
          <div>
            <h2 className="text-lg font-bold">Your Location:</h2>
            <p>Latitude: {location.lat}</p>
            <p>Longitude: {location.lng}</p>
          </div>
        )}
        {nearestStations ? (
          <div>
            <div className="md:grid grid-cols-2 gap-x-4">
              {nearestStations.map((station, index) => (
                <div key={index} className="mb-4">
                  <div className="text-xl font-semibold bg-gray-200 p-2 rounded-md">
                    {`${station.stopName} – ${station.stopId.endsWith('N') ? 'Northbound' : 'Southbound'}`}
                  </div>
                  {station.trains.map((train, index) => {
                    const TrainComponent =
                      trainComponentMap[train.routeId] ||
                      (() => (
                        <span className="text-red-500">Unknown Train</span>
                      ));
                    const isLastTrain = index === station.trains.length - 1;
                    return (
                      <div
                        key={index}
                        className={`flex justify-between items-center ${!isLastTrain && 'border-b border-gray-300'} py-2`}
                      >
                        <div className="flex items-center pl-1">
                          <TrainComponent />
                        </div>
                        <div className="pr-1">
                          <span className="bg-red-100 text-red-800 py-1 px-3 rounded-full text-sm">
                            {train.arrivalTime}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default LocationPrompt;
