'force dynamic';

import { PageContainer } from '@/app/components/templates/PageContainer';
import { LeaderboardContainer } from './leaderboardContainer';
import { getTeamData } from './teamDataFetcher';

async function LeaderboardPage({ params }: { params: any }) {
  const teamData = await getTeamData(params.id);
  console.log('teamData:', teamData);
  return (
    <PageContainer className="bg-none shadow-none rounded-none">
      <LeaderboardContainer leagueId={params.id} teamDataIn={teamData} />
    </PageContainer>
  );
}

export default LeaderboardPage;

export async function generateStaticParams() {
  const res = await fetch('https://api.james-spillmann.com/golf/leagues', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    },
    next: { revalidate: 15 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch leaderboard data');
  }

  const data = await res.json();

  if (!data?.data) {
    return [];
  }

  return data?.data?.map((league: string) => ({
    slug: league,
  }));
}
