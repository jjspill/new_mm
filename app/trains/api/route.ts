// pages/api/subway.ts
import { Train } from '../TrainComponents';
import { buildTrainData } from '../trainHelper';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: Request) {
  // let startTime = Date.now();
  const body = await request.json();
  const { stops } = body;
  const stopIds = stops?.map((station: any) => station.stopId);
  try {
    const queryText = 'SELECT * FROM arrivals WHERE stop_id = ANY($1)';
    const res = await sql(queryText, [stopIds]);
    const newTrainData = buildTrainData(res as Train[], stops);
    const stringify = JSON.stringify(newTrainData[0], null, 2);

    let endTime = Date.now();
    // console.log('Time taken:', stops[0].stopName, endTime - startTime);
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
  }
}
