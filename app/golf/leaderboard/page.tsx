'use client';

import { PageContainer } from '@/app/components/templates/PageContainer';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { assignScoresToTeams, getScores } from './leaderboardHelpers';
import { LeaderboardRow, UpdatedTime } from '../components/Leaderboard';
import { keys } from 'lodash';

const LeaderboardPage = () => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const [leagueId, setLeagueId] = useState<string>('');
  const [teamData, setTeamData] = useState<any[]>([]);
  const [liveScores, setLiveScores] = useState<any>([]);

  // setLeagueId(searchParam.get('league') || '');

  useEffect(() => {
    setLeagueId(searchParam.get('league') || '');
  }, []);

  useEffect(() => {
    if (!leagueId) {
      return;
    }
    // Fetch leaderboard data
    fetch('/golf/leaderboard/api/league-data', {
      headers: {
        LeagueId: leagueId,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTeamData(data);
      })
      .catch((error) => {
        console.error(
          'Error in /golf/leaderboard/league-data GET request: ',
          error,
        );
      });
  }, [leagueId]);

  useEffect(() => {
    const fetchLiveScores = () => {
      if (!leagueId) {
        return;
      }
      fetch('/golf/leaderboard/api/scores')
        .then((res) => res.json())
        .then((data) => {
          setLiveScores(data);
        })
        .catch((error) => {
          console.error(
            'Error in /golf/leaderboard/live-scores GET request: ',
            error,
          );
        });
    };

    fetchLiveScores();

    const interval = setInterval(() => {
      fetchLiveScores();
    }, 60000);

    return () => clearInterval(interval);
  }, [leagueId]);

  const updatedAt = liveScores?.leaderboard?.live_details?.updated;
  const scores = getScores(liveScores?.leaderboard);
  let scoreboardData: any = [];
  if (keys(scores).length > 0 && teamData.length > 0) {
    console.log('assigning scores to teams');
    console.log('teamData', teamData);
    console.log('scores', scores);
    scoreboardData = assignScoresToTeams(teamData, scores);
  }

  const leagueData = scoreboardData ? scoreboardData : teamData;

  return (
    <PageContainer className="bg-none shadow-none rounded-none">
      <div className="flex flex-col justify-center items-cente">
        <div className="bg-gray-200 font-semibold text-2xl p-4 rounded-lg text-center mb-10">
          <h1>{leagueId} Leaderboard</h1>
          <UpdatedTime date={updatedAt} />
        </div>
        <div className="w-full px-2 space-y-2">
          {leagueData.map((row: any, index: number) => (
            <LeaderboardRow key={index} {...row} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default LeaderboardPage;
