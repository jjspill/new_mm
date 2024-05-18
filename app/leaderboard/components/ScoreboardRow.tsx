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
    console.log('togglePlayers');
    setShowPlayers(!showPlayers);
  };

  return (
    <div className="flex flex-col justify-between py-4 m-2 px-2 rounded-2xl bg-gray-200">
      <div className="flex justify-between items-center">
        <p className="flex-grow text-left">{team_name}</p>
        <p className="text-center w-10 md:w-80">{total_score}</p>
        <button
          onClick={togglePlayers}
          className="bg-blue-500 text-white py-1 px-3 rounded ml-4"
        >
          {showPlayers ? 'Hide Players' : 'Show Players'}
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
