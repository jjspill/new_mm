// pages/api/subway.ts
import { getAPIUrl } from 'config/config';
import * as pg from 'pg';
import { Station, Train } from '../TrainComponents';
import { buildTrainData } from '../trainHelper';

const pgPool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: Request) {
  let startTime = 0;
  const body = await request.json();
  const { stops } = body;
  const stopIds = stops?.map((station: any) => station.stopId);

  const client = await pgPool.connect();
  try {
    startTime = new Date().getTime();
    const queryText = 'SELECT * FROM arrivals WHERE stop_id = ANY($1)';
    const res = await client.query(queryText, [stopIds]);
    const newTrainData = buildTrainData(res.rows, stops);
    const stringify = JSON.stringify(newTrainData[0], null, 2);

    return new Response(stringify);
  } catch (err: any) {
    console.error('Error executing query', err.stack);
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch train data',
        details: err.message,
      }),
      { status: 500 },
    );
  } finally {
    client.release();
  }
}
