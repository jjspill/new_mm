import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const res = await fetch(
    'https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard',
    // 'http://localhost:3001/scores',
    // `${getAPIUrl()}/scores`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
      next: { revalidate: 10 },
    },
  );

  const data = await res.json();
  const leaderboard = transformData(data);

  if (!leaderboard?.results?.leaderboard) {
    console.error('No data available');
    return new NextResponse(JSON.stringify({ error: 'No data available' }));
  }

  return new NextResponse(JSON.stringify(leaderboard));
}

function fixLastName(lastName: string) {
  if (lastName === 'Åberg') {
    return 'Aberg';
  }
  return lastName;
}

const transformData = (data: any) => {
  const leaderboard = data.events[0].competitions[0].competitors.map(
    (competitor: any) => {
      const status =
        competitor.linescores.filter((score: any) => score.value >= 0).length <=
        2
          ? 'cut'
          : 'active';

      return {
        first_name: competitor.athlete.shortName.split('. ')[0],
        last_name: fixLastName(competitor.athlete.shortName.split('. ').pop()),
        total_to_par:
          competitor.score === 'E' ? 0 : parseInt(competitor.score, 10),
        status: 'active',
        // status,
      };
    },
  );

  return {
    results: { leaderboard },
    live_details: { updated: new Date().toISOString() },
  };
};
