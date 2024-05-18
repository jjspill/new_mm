import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch(
    'https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard',
    {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    },
  );
  const data = transformData(await res.json());
  // console.log(data.events[0].competitions[0].competitors[0]);

  if (!data?.results?.leaderboard) {
    console.error('No data available');
  }

  return NextResponse.json({ data });
}

const transformData = (data: any) => {
  const leaderboard = data.events[0].competitions[0].competitors.map(
    (competitor: any) => {
      const status =
        competitor.linescores.filter((score: any) => score.value > 0).length <=
        2
          ? 'cut'
          : 'active';

      return {
        first_name: competitor.athlete.shortName.split('. ')[0],
        last_name: competitor.athlete.shortName.split('. ').pop(),
        total_to_par:
          competitor.score === 'E' ? 0 : parseInt(competitor.score, 10),
        status: status,
      };
    },
  );

  return {
    results: { leaderboard },
    live_details: { updated: new Date().toISOString() },
  };
};
