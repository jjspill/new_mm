// pages/api/subway.ts
import { getAPIUrl } from 'config/config';
import * as pg from 'pg';
import { Station, Train } from '../TrainComponents';
import { buildTrainData } from '../trainHelper';

const pgPool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: Request) {
  const body = await request.json();
  const { stops } = body;
  // console.log('Received stops:', stops); // Log received stops
  const stopIds = stops?.map((station: any) => station.stopId);

  // console.log('Received stop IDs:', stopIds); // Log received stop IDs

  const client = await pgPool.connect();
  try {
    const queryText = 'SELECT * FROM arrivals WHERE stop_id = ANY($1)';
    const res = await client.query(queryText, [stopIds]);
    const newTrainData = buildTrainData(res.rows, stops);
    const stringify = JSON.stringify(newTrainData[0], null, 2);

    // console.log('Returning train data:', stringify); // Log returned train data

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

// export async function POST(request: Request) {
//   const body = await request.json();
//   const { stops } = body;
//   const stopIds = stops.map((station: any) => station.stopId);

//   const client = await pgPool.connect();
//   try {
//     const queryText = 'SELECT * FROM arrivals WHERE stop_id = ANY($1)';
//     const res = await client.query(queryText, [stopIds]);
//     const newTrainData = buildTrainData(res.rows, stops);
//     return new Response(JSON.stringify(newTrainData));
//   } catch (err: any) {
//     console.error('Error executing query', err.stack);
//     return new Response(
//       JSON.stringify({ error: 'Failed to fetch train data' }),
//     );
//   } finally {
//     client.release();
//   }
// }
