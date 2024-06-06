// pages/api/subway.ts
import { getAPIUrl } from 'config/config';
import * as pg from 'pg';
import { Station, Train } from '../TrainComponents';

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

function buildTrainData(trains: Train[], stations: Station[]) {
  const newTrainData = stations.map((station) => {
    const northStationTrains = trains.filter(
      (train) =>
        train.stop_id === station.stopId && getDirection(train.trip_id) === 'N',
    );

    const southStationTrains = trains.filter(
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

const pgPool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: Request) {
  const body = await request.json();
  const { stops } = body;
  const stopIds = stops.map((station: any) => station.stopId);

  const client = await pgPool.connect();
  try {
    const queryText = 'SELECT * FROM arrivals WHERE stop_id = ANY($1)';
    const res = await client.query(queryText, [stopIds]);
    const newTrainData = buildTrainData(res.rows, stops);
    return new Response(JSON.stringify(newTrainData));
  } catch (err: any) {
    console.error('Error executing query', err.stack);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch train data' }),
    );
  } finally {
    client.release();
  }
}
