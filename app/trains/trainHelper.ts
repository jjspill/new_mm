import { Station, Train } from './TrainComponents';
import { parseISO, differenceInSeconds } from 'date-fns';
import stations from '@/public/json/stations.json';

function processTrains(trains: Train[] | null) {
  if (!trains) return [];
  const currentZonedTime = new Date();

  return trains
    .map((train) => {
      const arrivalTimeZoned = parseISO(train.arrival_time); // Already in Eastern Time
      const timeDiffInSeconds = differenceInSeconds(
        arrivalTimeZoned,
        currentZonedTime,
      );
      return {
        ...train,
        timeDiffInSeconds,
      };
    })
    .filter((train) => train.timeDiffInSeconds >= -30)
    .sort((a, b) => a.timeDiffInSeconds - b.timeDiffInSeconds) // Sort based on timeDiffInSeconds
    .map((train) => {
      const minutes = Math.floor(train.timeDiffInSeconds / 60);
      if (minutes <= 0) {
        train.arrival_time = 'arriving';
      } else {
        train.arrival_time = `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
      }
      return train;
    });
}

export const fixArrivalTime = (station: Station) => {
  station.n_trains = processTrains(station.n_trains);
  station.s_trains = processTrains(station.s_trains);
};

function getDirection(tripId: string): string {
  const tripPath = tripId.split('_')[1];
  const split = tripPath.split('..');
  let direction;
  if (split.length === 1) {
    direction = tripPath.split('.')[1][0];
  } else {
    direction = split[1][0];
  }

  if (direction != 'N' && direction != 'S') return '';
  return direction;
}

export function buildTrainData(trains: Train[], stations: Station[]) {
  const newTrainData = stations?.map((station) => {
    let northStationTrains = trains?.filter(
      (train) =>
        train.stop_id === station.stopId && getDirection(train.trip_id) === 'N',
    );

    let southStationTrains = trains?.filter(
      (train) =>
        train.stop_id === station.stopId && getDirection(train.trip_id) === 'S',
    );

    if (station.n_headsign === '') northStationTrains = [];
    if (station.s_headsign === '') southStationTrains = [];

    return {
      ...station,
      n_trains: northStationTrains,
      s_trains: southStationTrains,
    };
  });

  return newTrainData;
}

export const findClosestStations = (
  lat: number,
  lng: number,
  maxDistance: number = 0.5, // Default max distance in miles
): Station[] => {
  const filteredStops = stations
    .map((station: any) => {
      const distance = haversineDistance(
        lat,
        lng,
        parseFloat(station.stop_lat),
        parseFloat(station.stop_lon),
      );
      return { ...station, distance };
    })
    .filter((station: any) => station.distance <= maxDistance)
    .sort((a: any, b: any) => a.distance - b.distance);

  return filteredStops.map((station: any) => ({
    stopId: station.stop_id,
    stopName: station.stop_name,
    distance: station.distance,
    n_headsign: station.n_headsign,
    s_headsign: station.s_headsign,
    n_trains: null,
    s_trains: null,
  }));
};

const haversineDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const toRadians = (degrees: number): number => degrees * (Math.PI / 180);
  const R = 3959; // Radius of the Earth in miles
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in miles
};
