import { NextRequest, NextResponse } from 'next/server';
import course from '../../course.json';
import { revalidatePath } from 'next/cache';
export async function GET(request: NextRequest) {
  // revalidatePath('/golf/leaderboard/theopen2k24', 'page');
  const res = await fetch(
    'https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard',
    // 'http://localhost:3001/scores',
    // `${getAPIUrl()}/scores`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
      next: { revalidate: 0 }, //
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
  } else if (lastName === 'Højgaard') {
    return 'Hojgaard';
  }
  return lastName;
}

const transformData = (data: any) => {
  const competition = data.events[0].competitions[0];
  const round = competition.status.period;

  const leaderboard = data.events[0].competitions[0].competitors.map(
    (competitor: any) => {
      const status =
        competitor.linescores.filter((score: any) => score.value >= 0).length <=
        2
          ? 'cut'
          : 'active';

      const currentStrokes = competitor.linescores[round - 1].value;
      const scoreList = competitor.linescores[round - 1]?.linescores?.map(
        (score: any) => score.value,
      );

      const numHoles = competitor.linescores[round - 1].linescores?.length;
      const todaysScore =
        numHoles > 0
          ? currentStrokes - course.holes[numHoles - 1].current_par_through
          : null;

      return {
        first_name: competitor.athlete.shortName.split('. ')[0],
        last_name: fixLastName(competitor.athlete.shortName.split('. ').pop()),
        total_to_par:
          competitor.score === 'E' ? 0 : parseInt(competitor.score, 10),
        status: round <= 2 ? 'active' : status,
        round: round,
        numHoles,
        todaysScore: todaysScore,
        scoreList,
      };
    },
  );

  return {
    results: { leaderboard },
    live_details: { updated: new Date().toISOString() },
  };
};
