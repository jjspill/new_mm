'use client';

import React, { useState } from 'react';
import { PlayerData, ScoreboardRowData } from '../helpers';

export const ScoreboardRow: React.FC<ScoreboardRowData> = ({
  team_name,
  total_score,
  players,
}) => {
  const [showPlayers, setShowPlayers] = useState(false);

  const togglePlayers = () => {
    setShowPlayers(!showPlayers);
  };

  return (
    <div className="flex flex-col justify-between py-4 m-2 px-2 rounded-2xl bg-gray-200">
      <div className="flex justify-between items-center">
        <p className="flex-grow text-left">{team_name}</p>
        <p className="text-center w-10 md:w-80">{total_score}</p>
        <button
          onClick={togglePlayers}
          className="text-black py-1 px-3 rounded ml-4 flex items-center"
          aria-label={showPlayers ? 'Hide Players' : 'Show Players'}
        >
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
      </div>
      {showPlayers && players && (
        <div className="mt-4">
          {players.map((player, index) => (
            <div key={index} className="mt-2 p-2 bg-white rounded shadow">
              <p>
                {player.first_name} {player.last_name}
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
