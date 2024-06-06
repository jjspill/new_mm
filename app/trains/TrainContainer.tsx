'use client';

// components/LocationPrompt.tsx
import React, { useState, useEffect } from 'react';
import {
  Station,
  TrainMenuBar,
  trainSymbolMap,
  Location,
  StationsComponent,
  StationLoadingPlaceholder,
  Train,
} from './TrainComponents';
import {
  GRAND_CENTRAL,
  useContinuousCountdown,
  useGeolocation,
  useNearestStations,
  useTrainData,
} from './TrainHooks';

function fixArrivalTime(train: Train) {
  console.log('time', train.arrival_time);
  const arrivalTimeMillis = new Date(train.arrival_time).getTime();
  const currentTimeMillis = Date.now();
  const timeDiffInSeconds = (arrivalTimeMillis - currentTimeMillis) / 1000;

  if (timeDiffInSeconds < -30) {
    // Train departed more than 30 seconds ago
    train.arrival_time = 'departed';
  } else if (timeDiffInSeconds <= 0) {
    // Train is arriving now or has just arrived
    train.arrival_time = 'arriving';
  } else {
    // Train is yet to arrive; calculate minutes and seconds until arrival
    const minutes = Math.floor(timeDiffInSeconds / 60);
    const seconds = Math.floor(timeDiffInSeconds % 60);
    train.arrival_time = `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} and ${seconds} ${seconds === 1 ? 'second' : 'seconds'}`;
  }

  return train;
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

const TrainsContainer: React.FC = () => {
  const [searchRadius, setSearchRadius] = useState<string | number>(0.5);

  // hooks
  const { timer, refreshCounter } = useContinuousCountdown();
  const { location, setLocation, accessLocation, ipLocation } =
    useGeolocation();
  const { nearestStations, noTrainsFound, setNoTrainsFound } =
    useNearestStations(location, searchRadius);
  // const trainData = useTrainData(nearestStations, refreshCounter);

  const refreshData = () => {
    // if (location) {
    //   setNearestStations([]);
    //   setRefreshCounter(refreshCounter + 1);
    // }
  };

  const updateSearchRadius = (radius: string | number) => {
    setSearchRadius(radius);
  };

  const updateLocation = {
    resetNearestStations: () => {
      // setNearestStations([]);
    },
    locations: (newLocation: Location) => {
      // saveLocation(newLocation);
      // setLocation(newLocation);
    },
  };

  // trainData?.forEach((station) => {
  //   station.s_trains.forEach((train) => {
  //     fixArrivalTime(train);
  //   });
  // });
  //   station.s_trains.forEach((train) => {
  //     fixArrivalTime(train);
  //   });
  // });

  return (
    <div>
      <div className="flex justify-center items-center w-full h-10 bg-gray-200 text-center text-4xl font-bold text-gray-800 py-12">
        Nearby Trains
      </div>
      <div
        style={{
          width: `${(timer / 15) * 100}%`,
          height: '5px',
          backgroundColor: 'rgb(156 163 175)',
          transition: 'width 1s linear',
        }}
      />
      <TrainMenuBar
        radius={searchRadius}
        ipLocation={ipLocation}
        updateSearchRadius={updateSearchRadius}
        onRefresh={refreshData}
        onLocationFetch={updateLocation}
        onError={(error) => {
          console.error('Error getting location: ', error);
          // setAccessLocation(true);
        }}
      />
      <div className="w-full p-4 pb-0">
        {nearestStations ? (
          <StationsComponent
            stations={nearestStations}
            refreshCounter={refreshCounter}
          />
        ) : (
          <StationLoadingPlaceholder />
        )}

        {/* {!location && accessLocation ? (
          <div className="flex flex-col justify-center items-center h-40 pb-4 text-center">
            Location not available. Please enable location services.
          </div>
        ) : (!noTrainsFound && nearestStopsWithTrains.length === 0) ||
          (!location && !accessLocation) ? (
          <StationLoadingPlaceholder />
        ) : nearestStopsWithTrains.length > 0 ? (
          <StationsComponent
            stations={nearestStopsWithTrains}
            trainComponentMap={trainComponentMap}
          />
        ) : noTrainsFound && location ? (
          <div className="flex flex-col justify-center items-center h-40 pb-4 text-center">
            No trains nearby? Someone&apos;s gotta move to New York!
            <button
              onClick={() => updateSearchRadius('Demo')}
              className="mt-4 bg-gray-300 hover:bg-gray-700 text-gray-800 hover:text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            >
              Try Demo Location
            </button>
          </div>
        ) : (
          <StationLoadingPlaceholder />
        )} */}
      </div>
    </div>
  );
};

export default TrainsContainer;
