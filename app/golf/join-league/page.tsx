'use client';

import { useState } from 'react';
import Select, { MultiValue, ActionMeta } from 'react-select';
import { useRouter } from 'next/navigation';
import playersByTier from '../players.json';
import { PageContainer } from '@/app/components/templates/PageContainer';
import { useUser } from '@/app/contexts/UserContext';

export interface Player {
  id: string;
  name: string;
}

export interface TeamDetails {
  leagueId: string;
  teamDetails: {
    name: string;
    players: string[];
  };
  userId: string;
}

interface PlayersByTier {
  Tier1: string[];
  Tier2: string[];
  Tier3: string[];
  Tier4: string[];
  [key: string]: string[];
}

interface OptionType {
  label: string;
  value: string;
  tier: string;
}

const JoinLeaguePage: React.FC = () => {
  const router = useRouter();
  const [teamName, setTeamName] = useState<string>('');
  const [leagueId, setLeagueId] = useState<string>('');
  const [selectedPlayers, setSelectedPlayers] = useState<{
    [key: string]: OptionType[];
  }>({});

  const { user } = useUser();

  const handleSelectChange = (
    selected: MultiValue<OptionType>,
    action: ActionMeta<OptionType>,
  ) => {
    if (selected.length > 0) {
      const tier = selected[0].tier;
      setSelectedPlayers((prev) => ({ ...prev, [tier]: [...selected] }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      alert('Please log in to join a league');
      return;
    }

    // Flatten selections into a single array
    const allSelectedPlayers = Object.values(selectedPlayers).flat();

    // Required number of players from each tier
    const tierLimits: { [key: string]: number } = {
      Tier1: 2,
      Tier2: 2,
      Tier3: 1,
      Tier4: 1,
    };

    // Calculate the count of selected players from each tier
    const countsByTier: { [key: string]: number } = {};
    allSelectedPlayers.forEach((player) => {
      countsByTier[player.tier] = (countsByTier[player.tier] || 0) + 1;
    });

    // Check if the selected players meet the required counts
    let isValid = true;
    for (const [tier, limit] of Object.entries(tierLimits)) {
      if ((countsByTier[tier] || 0) !== limit) {
        isValid = false;
        alert(`Please select exactly ${limit} players from ${tier}`);
        break;
      }
    }

    if (!isValid) {
      return;
    }

    // Proceed with the submission
    const teamDetails: TeamDetails = {
      leagueId,
      userId: user?.username,
      teamDetails: {
        name: teamName,
        players: allSelectedPlayers.map((player) => player.label),
      },
    };

    fetch('/golf/join-league/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teamDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
          return;
        }
        alert('Team created successfully!');
        router.push(`/golf/leaderboard/${leagueId}`);
      })
      .catch((error) => console.error('Error creating team:', error));
  };

  return (
    <PageContainer className="bg-none shadow-none rounded-none h-[80vh] max-w-2xl">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-lg font-bold mb-4">Join a League</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(playersByTier).map((tier) => (
            <div key={tier}>
              <label className="block mb-2">{`${tier} Players:`}</label>
              <Select
                menuPlacement="auto"
                options={(playersByTier as PlayersByTier)[tier].map(
                  (player: string) => ({
                    label: player,
                    value: player,
                    tier,
                  }),
                )}
                isMulti
                onChange={handleSelectChange}
                className="text-black"
              />
            </div>
          ))}
          <div>
            <label htmlFor="leagueId" className="block mb-2">
              League ID:
            </label>
            <input
              type="text"
              id="leagueId"
              value={leagueId}
              onChange={(e) => setLeagueId(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="teamName" className="block mb-2">
              Team Name:
            </label>
            <input
              type="text"
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </PageContainer>
  );
};

export default JoinLeaguePage;
