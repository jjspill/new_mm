'use client';

// components/LocationPrompt.tsx
import React, { useState, useEffect } from 'react';
import {
  Spinner,
  UnknownTrainComponent,
  trainComponentMap,
} from './TrainComponents';

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

function removeMissedTrains(stations: Station[]): Station[] {
  stations.forEach((station) => {
    station.trains = station.trains.filter((train) => {
      const arrivalTimeMillis = new Date(train.arrivalTime).getTime();
      const currentTimeMillis = Date.now();
      const timeDiffInSeconds = (arrivalTimeMillis - currentTimeMillis) / 1000;

      if (timeDiffInSeconds <= 0) {
        // Train has departed
        return false;
      }

      // Format the time to arrival
      train.arrivalTime =
        timeDiffInSeconds < 60
          ? 'arriving'
          : `${Math.floor(timeDiffInSeconds / 60)} ${Math.floor(timeDiffInSeconds / 60) === 1 ? 'minute' : 'minutes'}`;

      return true;
    });
  });

  return stations;
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

const LOCATION_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

function getSavedLocation() {
  const saved = localStorage?.getItem('userLocation');
  if (saved) {
    const parsed = JSON.parse(saved);
    const isRecent =
      new Date().getTime() - parsed.timestamp < LOCATION_EXPIRY_TIME;
    if (isRecent) {
      return parsed.location;
    }
  }
  return null;
}

function saveLocation(location: Location) {
  const data = {
    location,
    timestamp: new Date().getTime(),
  };
  localStorage.setItem('userLocation', JSON.stringify(data));
}

const TrainsContainer: React.FC = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [nearestStations, setNearestStations] = useState<Station[]>([]);
  const [timer, setTimer] = useState(30);
  const [fetched, setFetched] = useState(false);
  const [accessLocation, setAccessLocation] = useState(false);

  const findNearestStations = async () => {
    try {
      const body = JSON.stringify({
        lat: location?.lat,
        long: location?.lng,
      });
      const response = await fetch(`/trains/api`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      const data: ApiResponse = await response.json();
      const stations = data.stops;
      setNearestStations(sortStations(removeMissedTrains(stations)));
      setFetched(true);
    } catch (error) {
      console.error('Error finding nearest stations: ', error);
    }
  };

  useEffect(() => {
    const cachedLocation = getSavedLocation();
    if (cachedLocation) {
      setLocation(cachedLocation);
    } else if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          saveLocation(newLocation);
          setLocation(newLocation);
        },
        (error) => {
          setAccessLocation(true);
          console.error('Error getting location: ', error);
        },
      );
    } else {
      console.error('Geolocation is not available.');
    }
  }, []);

  useEffect(() => {
    if (location) {
      const intervalId = setInterval(() => {
        findNearestStations();
        setTimer(30);
      }, 30000);

      findNearestStations();
      return () => clearInterval(intervalId);
    }
  }, [location]);

  useEffect(() => {
    const timerId =
      timer > 0 ? setTimeout(() => setTimer(timer - 1), 1000) : undefined;
    return () => clearTimeout(timerId);
  }, [timer]);

  return (
    <div>
      <div className="flex justify-center items-center w-full h-10 bg-gray-200 text-center text-4xl font-bold text-gray-800 py-12">
        Nearest Trains
      </div>
      <div
        style={{
          width: `${(timer / 30) * 100}%`,
          height: '5px',
          backgroundColor: 'rgb(156 163 175)',
          transition: 'width 1s linear',
        }}
      />
      {!location && accessLocation && (
        <div className="flex justify-center items-center h-64">
          Location not available. Please enable location services.
        </div>
      )}
      <div className="w-full p-4 pb-0">
        {/* {location && (
          <div>
            <h2 className="text-lg font-bold">Your Location:</h2>
            <p>Latitude: {location.lat}</p>
            <p>Longitude: {location.lng}</p>
          </div>
        )} */}
        {nearestStations && (
          <div>
            <div className="md:grid grid-cols-2 gap-x-4">
              {nearestStations.map((station, index) => (
                <div key={index} className="mb-4">
                  <div className="flex flex-col text-center text-xl font-semibold bg-gray-200 p-2 rounded-md">
                    {`${station.stopName} – ${station.stopId.endsWith('N') ? 'Northbound' : 'Southbound'}`}
                    <span className="text-sm font-normal">
                      {station.distance.toFixed(2)} miles
                    </span>
                  </div>
                  {station.trains.slice(0, 5).map((train, index) => {
                    const TrainComponent =
                      trainComponentMap[train.routeId] || null;

                    const isLastTrain =
                      index === station.trains.length - 1 || index === 4;
                    return (
                      <div
                        key={index}
                        className={`flex justify-between items-center ${!isLastTrain && 'border-b border-gray-300'} py-2`}
                      >
                        <div className="flex items-center pl-1">
                          {TrainComponent && <TrainComponent />}
                          {!TrainComponent && (
                            <UnknownTrainComponent routeId={train.routeId} />
                          )}
                        </div>
                        <div>
                          {/* <span className="text-gray-800 text-sm">
                            {train.tripId}
                          </span> */}
                        </div>
                        <div className="pr-1">
                          <span
                            className={`${
                              train.arrivalTime === 'arriving'
                                ? 'bg-red-100 text-red-800'
                                : train.arrivalTime.includes('minute') &&
                                    parseInt(train.arrivalTime.split(' ')[0]) <
                                      5
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-green-100 text-green-800'
                            } py-1 px-3 rounded-full text-sm`}
                          >
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
        )}

        {nearestStations.length === 0 && fetched && (
          <div className="flex justify-center items-center h-40 pb-4">
            No trains nearby? Someones gotta move to New York!
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainsContainer;
