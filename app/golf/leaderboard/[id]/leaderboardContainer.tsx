'use client';

import { keys, set } from 'lodash';
import {
  assignScoresToTeams,
  getScores,
  shouldDisplayData,
} from '../leaderboardHelpers';
import { LeaderboardRow, UpdatedTime } from '../../components/Leaderboard';
import { useUser } from '@/app/contexts/UserContext';
import { useEffect, useState } from 'react';

interface LeaderboardContainerProps {
  leagueId: string;
}

export const LeaderboardContainer = ({
  leagueId,
}: LeaderboardContainerProps) => {
  const [liveScores, setLiveScores] = useState({} as any);
  const [teamData, setTeamData] = useState([] as any);
  const { user, setUser } = useUser();

  useEffect(() => {
    const fetchLiveScores = async () => {
      const res = await fetch('/golf/api/live-data');
      const data = await res.json();
      setLiveScores(data);
    };

    const fetchTeamData = async () => {
      const res = await fetch(`/golf/api/league-data?leagueId=${leagueId}`);
      const data = await res.json();
      setTeamData(data);
    };

    fetchLiveScores();
    fetchTeamData();
  }, [leagueId]);

  if (
    Object.keys(liveScores).length === 0 ||
    (teamData && teamData.length === 0)
  ) {
    return <div className="pt-20">Loading...</div>;
  }

  const updatedAt = liveScores?.live_details?.updated;
  const scores = getScores(liveScores);
  let scoreboardData: any = [];
  if (keys(scores).length > 0 && teamData.length > 0) {
    scoreboardData = assignScoresToTeams(teamData, scores);
  }

  const leagueData = scoreboardData ? scoreboardData : teamData;
  const pgaHasStarted = shouldDisplayData();

  return (
    <div className="items-justify-center w-full">
      <div className="flex flex-col justify-center items-center m-auto w-full max-w-lg">
        <div className="bg-gray-200 font-semibold text-2xl p-4 rounded-lg text-center mb-10">
          <h1>{leagueId} Leaderboard</h1>
          <UpdatedTime date={updatedAt} />
        </div>
        <div className="w-full px-2 space-y-2">
          {pgaHasStarted &&
            leagueData &&
            leagueData.map((row: any, index: number) => (
              <LeaderboardRow key={index} {...row} />
            ))}
          {!pgaHasStarted &&
            leagueData &&
            user &&
            leagueData.map((row: any, index: number) => {
              if (row.userId === user.username) {
                return <LeaderboardRow key={index} {...row} />;
              }
              return null;
            })}
        </div>
      </div>
    </div>
  );
};
