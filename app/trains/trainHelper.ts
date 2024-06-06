import { Station, Train } from './TrainComponents';
import { parseISO, differenceInSeconds } from 'date-fns';

function processTrains(trains: Train[]) {
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
  }
  direction = split[1][0];

  if (direction != 'N' && direction != 'S') return '';
  return direction;
}

export function buildTrainData(trains: Train[], stations: Station[]) {
  const newTrainData = stations?.map((station) => {
    const northStationTrains = trains?.filter(
      (train) =>
        train.stop_id === station.stopId && getDirection(train.trip_id) === 'N',
    );

    const southStationTrains = trains?.filter(
      (train) =>
        train.stop_id === station.stopId && getDirection(train.trip_id) === 'S',
    );
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
  lon: number,
  maxDistance: number = 0.5, // Default max distance in miles
  stops: any,
): Promise<Station[]> => {
  try {
    const filteredStops = stops
      .map((stop: any) => {
        const distance = haversineDistance(
          lat,
          lon,
          parseFloat(stop.stop_lat),
          parseFloat(stop.stop_lon),
        );
        return { ...stop, distance };
      })
      .filter((stop: any) => stop.distance <= maxDistance)
      .sort((a: any, b: any) => a.distance - b.distance);

    return filteredStops.map((stop: any) => ({
      stopId: stop.stop_id,
      stopName: stop.stop_name,
      distance: stop.distance,
      n_headsign: stop.n_headsign,
      s_headsign: stop.s_headsign,
    }));
  } catch (error) {
    console.error('Failed to find closest stations:', error);
    throw error;
  }
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
