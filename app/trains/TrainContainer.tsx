'use client';

// components/LocationPrompt.tsx
import React, { useState, useEffect } from 'react';
import {
  Spinner,
  Station,
  TrainMenuBar,
  UnknownTrainComponent,
  trainComponentMap,
  Location,
  ApiResponse,
  StationsComponent,
  StationLoadingPlaceholder,
} from './TrainComponents';

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

interface Stop {
  stopId: string;
  stopName: string;
  distance: number;
}

interface Train {
  arrivalTime: string;
  tripId: string;
  routeId: string;
}

interface BackendResponse {
  stopId: string;
  southbound: Train[];
  northbound: Train[];
}

const TrainsContainer: React.FC = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [nearestStations, setNearestStations] = useState<Stop[]>([]);
  const [nearestStopsWithTrains, setNearestStopsWithTrains] = useState<
    Station[]
  >([]);
  const [timer, setTimer] = useState(30);
  const [accessLocation, setAccessLocation] = useState(false);
  const [searchRadius, setSearchRadius] = useState<string | number>(0.5);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [trainData, setTrainData] = useState<BackendResponse[] | null>([]);
  const [noTrainsFound, setNoTrainsFound] = useState(false);

  const refreshData = () => {
    if (location) {
      setNearestStations([]);
      setRefreshCounter(refreshCounter + 1);
    }
  };

  const updateSearchRadius = (radius: string | number) => {
    setSearchRadius(radius);
    setRefreshCounter(refreshCounter + 1);
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

  // Get users location
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

  // Fetch nearest stations
  useEffect(() => {
    const findNearestStations = async () => {
      try {
        if (!location || !searchRadius) {
          return;
        }
        const response = await fetch(`/trains/stops/api`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lat: location.lat,
            lon: location.lng,
            distance: searchRadius,
          }),
        });

        const stopsList = await response.json();
        console.log('stopsList', stopsList);
        setNearestStations(stopsList);
      } catch (error) {
        console.error('Error finding nearest stations: ', error);
      }
    };

    // setFetching(true);
    setNearestStopsWithTrains([]);
    findNearestStations();
  }, [location, searchRadius]);

  // Fetch train data
  useEffect(() => {
    const fetchData = async () => {
      if (nearestStations) {
        const stopIds = nearestStations.map((station) => station.stopId);
        try {
          const response = await fetch('/trains/api', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ stopIds }),
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setTrainData(data);
        } catch (error) {
          console.error('Failed to fetch train data:', error);
        }
      }
    };

    fetchData();
  }, [nearestStations]);

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
      if (stopsWithTrains.length === 0) {
        setNoTrainsFound(true);
      } else {
        setNoTrainsFound(false);
      }
    }
  }, [trainData]);

  useEffect(() => {
    if (location) {
      const intervalId = setInterval(() => {
        setTimer(30);
      }, 30000);

      return () => clearInterval(intervalId);
    }
  }, []);

  useEffect(() => {
    const timerId =
      timer > 0 ? setTimeout(() => setTimer(timer - 1), 1000) : undefined;
    return () => clearTimeout(timerId);
  }, [timer]);

  // useEffect(() => {
  //   if (nearestStations.length > 0) {
  //     setNoTrainsFound(false);
  //   } else {
  //     setNoTrainsFound(true);
  //   }
  // }, [nearestStations]);

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
      <TrainMenuBar
        radius={searchRadius}
        updateSearchRadius={updateSearchRadius}
        onRefresh={refreshData}
        onLocationFetch={updateLocation}
        onError={(error) => {
          console.error('Error getting location: ', error);
          setAccessLocation(true);
        }}
      />
      {!location && accessLocation && (
        <div className="flex justify-center items-center h-64">
          Location not available. Please enable location services.
        </div>
      )}
      <div className="w-full p-4 pb-0">
        {!noTrainsFound && nearestStopsWithTrains.length === 0 && (
          <StationLoadingPlaceholder />
        )}

        {nearestStopsWithTrains && (
          <StationsComponent
            stations={nearestStopsWithTrains}
            trainComponentMap={trainComponentMap}
          />
          // (
          // : refreshCounter > 0 ? (
          //   <StationLoadingPlaceholder />
          // )
        )}

        {noTrainsFound && (
          <div className="flex justify-center items-center h-40 pb-4 text-center">
            No trains nearby? Someone&apos;s gotta move to New York!
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainsContainer;
