import { useState, useEffect } from 'react';

import { Location, Station } from './TrainComponents';

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

export const useGeolocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [accessLocation, setAccessLocation] = useState(false);

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

  return { location, accessLocation };
};

export const useNearestStations = (
  location: Location | null,
  searchRadius: string | number,
  setNearestStopsWithTrains: (stops: Station[]) => void,
) => {
  const [nearestStations, setNearestStations] = useState<Stop[]>([]);
  const [noTrainsFound, setNoTrainsFound] = useState(false);

  useEffect(() => {
    const findNearestStations = async () => {
      if (!location || !searchRadius) return;
      try {
        const response = await fetch(`/trains/stops/api`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lat: location.lat,
            lon: location.lng,
            distance: searchRadius,
          }),
        });

        const stopsList = await response.json();
        setNearestStations(stopsList);
      } catch (error) {
        console.error('Error finding nearest stations: ', error);
      }
    };

    setNearestStopsWithTrains([]);
    setNoTrainsFound(false);
    findNearestStations();
  }, [location, searchRadius]);

  return { nearestStations, noTrainsFound, setNoTrainsFound };
};

export const useTrainData = (
  nearestStations: Stop[],
  refreshCounter: number,
) => {
  const [trainData, setTrainData] = useState<BackendResponse[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (nearestStations.length > 0) {
        const stopIds = nearestStations.map((station) => station.stopId);
        try {
          const response = await fetch('/trains/api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stopIds }),
          });
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          setTrainData(data);
        } catch (error) {
          console.error('Failed to fetch train data:', error);
        }
      } else {
        setTrainData([]);
      }
    };

    fetchData();
  }, [nearestStations, refreshCounter]);

  return trainData;
};

export const useContinuousCountdown = () => {
  const duration = 15;
  const [timer, setTimer] = useState(duration);
  const [refreshCounter, setRefreshCounter] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          setRefreshCounter((prevCounter) => prevCounter + 1);
          return duration;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return { timer, refreshCounter };
};
