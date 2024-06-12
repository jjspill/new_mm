import { getAPIUrl } from 'config/config';
import { splitName } from '../leaderboardHelpers';

export async function fetchLiveScores() {
  const res = await fetch(
    // 'https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard',
    // 'http://localhost:3001/scores',
    `${getAPIUrl()}/scores`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
      next: { revalidate: 15 },
    },
  );

  console.log(
    'fetching live scores',
    new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
  );

  const data = await res.json();
  const leaderboard = transformData(data);

  if (!leaderboard?.results?.leaderboard) {
    console.error('No data available');
    return { error: 'No data available' };
  }
  return leaderboard;
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

export async function fetchLeagueData(leagueId: string) {
  const apiUrl = getAPIUrl();
  try {
    if (!leagueId) {
      return {
        error: 'An account is required to access this page.',
      };
    }

    const res = await fetch(`${apiUrl}/golf/teams/${leagueId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
      next: { revalidate: 15 },
    });

    console.log('fetching league data');

    const league = await res.json();
    if (!league?.data) {
      console.error('No data available');
      return { error: 'No data available' };
    }
    league.data.map((team: any) => {
      team.players = team.players.map((playerName: any) => {
        const { firstName, lastName } = splitName(playerName);
        return {
          firstName,
          lastName,
        };
      });
    });

    return league?.data;
  } catch (error) {
    console.error('Error in /golf POST request: ', error);
    return { message: 'Failed to get teams', error };
  }
}
