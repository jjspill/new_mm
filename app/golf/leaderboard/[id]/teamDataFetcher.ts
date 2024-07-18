import { getAPIUrl } from 'config/config';
import { NextRequest } from 'next/server';
import { splitName } from '../../leaderboard/leaderboardHelpers';
import { revalidatePath } from 'next/cache';

export async function getTeamData(leagueId: string) {
  const apiUrl = getAPIUrl();

  if (!leagueId) {
    return JSON.stringify({
      error: 'An account is required to access this page.',
    });
  }

  const encodedLeagueId = encodeURIComponent(leagueId);

  try {
    console.log('Fetching teams for league:', leagueId);
    const res = await fetch(`${apiUrl}/golf/teams/${encodedLeagueId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
      next: { revalidate: 60 * 5 }, // 10 minutes
    });

    const league = await res.json();
    console.log('League data fetched');
    if (!league?.data) {
      console.error('No data available');
      return JSON.stringify({ error: 'No data available' });
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
    return JSON.stringify({ message: 'Failed to get teams', error });
  }
}
