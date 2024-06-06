// pages/api/subway.ts

import { parse } from 'csv-parse/sync';
import { readFileSync } from 'fs';
import { findClosestStations } from '../../trainHelper';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lat, lon, distance } = body;
    const stationInfo = readFileSync(
      `${process.cwd()}/public/csv/stops.csv`,
      'utf-8',
    );
    const stops = parse(stationInfo, {
      columns: true,
      skip_empty_lines: true,
    });

    const closestStations = findClosestStations(lat, lon, distance, stops);

    return new Response(JSON.stringify(closestStations));
  } catch (error) {
    console.error('Failed to find nearest subway stations:', error);
    return new Response(
      JSON.stringify({
        message: 'Failed to find nearest subway stations',
        error,
      }),
    );
  }
}
