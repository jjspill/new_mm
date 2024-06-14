'use client';

import React, { useState } from 'react';
import {
  PlayerData,
  ScoreboardRowData,
} from '../leaderboard/leaderboardHelpers';

interface LeaderboardRowProps {
  name: string;
  total_score?: number;
  players: {
    firstName: string;
    lastName: string;
    score?: number;
    status?: string;
  }[];
}

export const LeaderboardRowLoader: React.FC = () => {
  return (
    <div className="flex flex-col justify-between h-[48px] p-2 rounded-xl bg-gray-200 w-full">
      <div className="flex-grow text-left h-[10px] rounded-md animate-pulse bg-gray-400" />
    </div>
  );
};

export const LeaderboardRow: React.FC<LeaderboardRowProps> = ({
  name,
  total_score,
  players,
}) => {
  const [showPlayers, setShowPlayers] = useState(false);

  const togglePlayers = () => {
    setShowPlayers(!showPlayers);
  };

  let playerOrder = players;

  // if no players have an undefined score sort them by score
  if (players.every((player) => player.score !== undefined)) {
    playerOrder = players.sort((a, b) => a.score! - b.score!);
  }

  return (
    <div className="flex flex-col justify-between p-2 rounded-xl bg-gray-200 w-full">
      <button
        onClick={togglePlayers}
        className="flex justify-between items-center w-full text-black py-1 px-3 rounded"
        aria-label={showPlayers ? 'Hide Players' : 'Show Players'}
      >
        <p className="flex-grow text-left">{name}</p>
        <p className="text-center w-10 pr-10">{total_score}</p>
        <svg
          className={`transform transition-transform duration-300 ${showPlayers ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          width="24"
          height="24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          ></path>
        </svg>
      </button>

      {showPlayers && players && (
        <div className="mt-4">
          {playerOrder?.map((player, index) => (
            <div
              key={index}
              className={`mt-2 p-2 rounded shadow ${
                index === playerOrder.length - 1 ? 'bg-red-100' : 'bg-green-100'
              }`}
            >
              <p>
                {player.firstName} {player.lastName}
              </p>
              <p>Score: {player.score}</p>
              <p>Status: {player.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const convertUTCDateToLocalDate = (date: string): string => {
  const newDate = new Date(date);
  return newDate.toLocaleString('en-US', { timeZoneName: 'short' });
};

export function UpdatedTime({ date }: { date: string }) {
  const convertedTime = React.useMemo(
    () => convertUTCDateToLocalDate(date),
    [date],
  );

  return <span className="text-sm">{convertedTime}</span>;
}
