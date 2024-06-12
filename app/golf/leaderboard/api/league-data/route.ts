import { getAPIUrl } from 'config/config';
import { NextRequest, NextResponse } from 'next/server';
import { splitName } from '../../leaderboardHelpers';

export async function GET(request: NextRequest) {
  try {
    const apiUrl = getAPIUrl();
    // get league id from query
    const leagueId = request.nextUrl.searchParams.get('leagueId');

    if (!leagueId) {
      return new NextResponse(
        JSON.stringify({
          error: 'An account is required to access this page.',
        }),
      );
    }

    const res = await fetch(`${apiUrl}/golf/teams/${leagueId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
    });

    const league = await res.json();
    if (!league?.data) {
      console.error('No data available');
      return new NextResponse(JSON.stringify({ error: 'No data available' }));
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

    return new NextResponse(JSON.stringify(league?.data));
  } catch (error) {
    console.error('Error in /golf POST request: ', error);
    return new NextResponse(
      JSON.stringify({ message: 'Failed to get teams', error }),
    );
  }
}
