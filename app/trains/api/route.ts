// pages/api/subway.ts
import { Train } from '../TrainComponents';
import { buildTrainData } from '../trainHelper';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: Request) {
  const body = await request.json();
  const { stops } = body;
  const stopIds = stops?.map((station: any) => station.stopId);

  const TIMEOUT_MS = 500; // Maximum delay for primary before checking secondary

  const fetchPrimary = sql('SELECT * FROM arrivals WHERE stop_id = ANY($1)', [
    stopIds,
  ]).then((data) => ({ source: 'primary', data }));
  const fetchSecondary = sql(
    'SELECT * FROM arrivals_secondary WHERE stop_id = ANY($1)',
    [stopIds],
  ).then((data) => ({ source: 'secondary', data }));

  let primaryResolved = false;
  let fallbackTimer: NodeJS.Timeout;

  const primaryPromise = new Promise(async (resolve, reject) => {
    try {
      const data = await fetchPrimary;
      primaryResolved = true;
      clearTimeout(fallbackTimer);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });

  const fallbackPromise = new Promise((resolve) => {
    fallbackTimer = setTimeout(() => {
      if (!primaryResolved) {
        fetchSecondary.then(resolve);
      }
    }, TIMEOUT_MS);
  });

  try {
    // essentially this tries to use the primary source, but if its being written to, we can fetch the backup that was updated prior to the primary
    const result = (await Promise.race([primaryPromise, fallbackPromise])) as {
      source: string;
      data: Train[];
    };
    const newTrainData = buildTrainData(result.data, stops);
    const stringify = JSON.stringify(newTrainData[0], null, 2);
    return new Response(stringify);
  } catch (error) {
    console.error('Error fetching data from database sources:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch train data',
        details: error,
      }),
      { status: 500 },
    );
  }
}
