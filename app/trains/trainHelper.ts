import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';

export const findClosestStations = (
  lat: number,
  lon: number,
  maxDistance: number = 0.5, // Default max distance in miles
  stops: any,
): Promise<{ stopId: string; stopName: string; distance: number }[]> => {
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
