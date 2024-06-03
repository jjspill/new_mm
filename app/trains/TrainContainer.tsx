'use client';

// components/LocationPrompt.tsx
import React, { useState, useEffect } from 'react';
import {
  Station,
  TrainMenuBar,
  trainComponentMap,
  Location,
  StationsComponent,
  StationLoadingPlaceholder,
} from './TrainComponents';
import {
  GRAND_CENTRAL,
  useContinuousCountdown,
  useGeolocation,
  useNearestStations,
  useTrainData,
} from './TrainHooks';

function fixArrivalTime(stations: Station[]): Station[] {
  stations.forEach((station) => {
    station.trains = station.trains.filter((train) => {
      const arrivalTimeMillis = new Date(train.arrivalTime).getTime();
      const currentTimeMillis = Date.now();
      const timeDiffInSeconds = (arrivalTimeMillis - currentTimeMillis) / 1000;

      // Format the time to arrival
      train.arrivalTime =
        timeDiffInSeconds <= 0 || Math.floor(timeDiffInSeconds / 60) === 0
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

const TrainsContainer: React.FC = () => {
  const [nearestStopsWithTrains, setNearestStopsWithTrains] = useState<
    Station[]
  >([]);
  const [searchRadius, setSearchRadius] = useState<string | number>(0.5);

  // hooks
  const { timer, refreshCounter } = useContinuousCountdown();
  const { location, setLocation, accessLocation, ipLocation } =
    useGeolocation();
  const { nearestStations, noTrainsFound, setNoTrainsFound } =
    useNearestStations(location, searchRadius, setNearestStopsWithTrains);
  const trainData = useTrainData(nearestStations, refreshCounter);

  const refreshData = () => {
    // if (location) {
    //   setNearestStations([]);
    //   setRefreshCounter(refreshCounter + 1);
    // }
  };

  const updateSearchRadius = (radius: string | number) => {
    if (radius === 'Demo') {
      setSearchRadius('Demo');
      setLocation({
        lat: GRAND_CENTRAL.lat,
        lng: GRAND_CENTRAL.lng,
      });
    } else {
      setSearchRadius(radius);
    }
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

  // Combine nearest stations with train data
  useEffect(() => {
    if (trainData) {
      const stopsWithTrains: Station[] = [];
      trainData.forEach((stop) => {
        const stopData = nearestStations.find(
          (station) => station.stopId === stop.stopId,
        );
        if (stopData) {
          if (stop.northbound) {
            const stationN: Station = {
              stopId: stop.stopId + 'N',
              stopName: stopData.stopName,
              distance: stopData.distance,
              trains: [],
            };
            stop.northbound.forEach((train) => {
              stationN.trains.push({
                ...train,
                stopId: stop.stopId + 'N',
              });
            });
            stopsWithTrains.push(stationN);
          }
          if (stop.southbound) {
            const stationS: Station = {
              stopId: stop.stopId + 'S',
              stopName: stopData.stopName,
              distance: stopData.distance,
              trains: [],
            };
            stop.southbound.forEach((train) => {
              stationS.trains.push({
                ...train,
                stopId: stop.stopId + 'S',
              });
            });
            stopsWithTrains.push(stationS);
          }
        }
      });
      setNearestStopsWithTrains(sortStations(fixArrivalTime(stopsWithTrains)));
      if (nearestStopsWithTrains.length === 0 && nearestStations.length === 0) {
        const messageTimer = setTimeout(() => {
          console.log('No trains found');
          console.log('nearestStopsWithTrains', nearestStopsWithTrains);
          console.log('nearestStations', nearestStations);
          console.log('trainData', trainData);
          console.log('noTrainsFound', noTrainsFound);
          console.log('location', location);
          console.log('accessLocation', accessLocation);
          setNoTrainsFound(true);
        }, 1000);

        return () => clearTimeout(messageTimer);
      } else {
        setNoTrainsFound(false);
      }
    }
  }, [trainData]);

  return (
    <div>
      <div className="flex justify-center items-center w-full h-10 bg-gray-200 text-center text-4xl font-bold text-gray-800 py-12">
        Nearest Trains
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
        {!location && accessLocation ? (
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
        )}
      </div>
    </div>
  );
};

export default TrainsContainer;
