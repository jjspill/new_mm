import { getAPIUrl } from 'config/config';
import { NextResponse } from 'next/server';

const USERS_URL = 'https://api.sleeper.app/v1/league/1137047510280773632/users';
const ROSTERS_URL =
  'https://api.sleeper.app/v1/league/1137047510280773632/rosters';
const MATCHUPS_URL =
  'https://api.sleeper.app/v1/league/1137047510280773632/matchups/3';

export async function GET(request: Request) {
  try {
    const usersRes = await fetch(USERS_URL);
    const users = await usersRes.json();

    const rostersRes = await fetch(ROSTERS_URL);
    const rosters = await rostersRes.json();

    const matchupsRes = await fetch(MATCHUPS_URL);
    const matchups = await matchupsRes.json();

    const matchupData = buildMatchupData({ matchups, rosters, users });

    console.log('matchupData: ', matchupData);

    return new NextResponse(JSON.stringify(matchupData));
  } catch (error) {
    console.error('Error in /fantasy GET request: ', error);
    return new NextResponse(
      JSON.stringify({ message: 'Failed to get fantasy data', error })
    );
  }
}

function buildMatchupData({
  matchups,
  rosters,
  users,
}: {
  matchups: any[];
  rosters: any[];
  users: any[];
}) {
  return rosters.map((roster) => {
    const teamName = users.find((user) => user.user_id === roster.owner_id);
    const score = matchups.find(
      (matchup) => matchup.roster_id === roster.roster_id
    );

    return {
      teamName: teamName?.display_name,
      score: score?.points,
    };
  });
}
