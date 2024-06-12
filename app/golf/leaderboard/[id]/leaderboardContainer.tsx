'use client';

import { keys, set } from 'lodash';
import { assignScoresToTeams, getScores } from '../leaderboardHelpers';
import { useEffect, useState } from 'react';
import { LeaderboardRow, UpdatedTime } from '../../components/Leaderboard';

function shouldDisplayData() {
  const now = new Date();
  const targetDate = new Date(now.getFullYear(), 5, 13, 6, 30, 0);
  return now >= targetDate;
}

interface LeaderboardContainerProps {
  leagueId: string;
  teamData: any;
  liveScores: any;
}

export const LeaderboardContainer = ({
  leagueId,
  teamData,
  liveScores,
}: LeaderboardContainerProps) => {
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
          {/* {pgaHasStarted && */}
          {leagueData &&
            leagueData.map((row: any, index: number) => (
              <LeaderboardRow key={index} {...row} />
            ))}
        </div>
      </div>
    </div>
  );
};
