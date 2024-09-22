'use client';

import { useEffect, useState } from 'react';

interface TeamData {
  teamName: string;
  score: number;
}

const cutList: string[] = ['jtfitz', 'sheindog'];

export default function FantasyPage() {
  const [teamData, setTeamData] = useState<TeamData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/fantasy/api');
        const data = await response.json();
        data.sort((a: TeamData, b: TeamData) => a.score - b.score);
        setTeamData(data);
      } catch (error) {
        console.error('Error fetching fantasy data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-col pt-20">
        <div className="flex flex-col flex-grow p-4 m-4 lg:mx-80 bg-white shadow-lg rounded-2xl">
          {teamData ? (
            teamData.map((team, index) => {
              let backgroundColor = '';
              if (cutList.includes(team.teamName)) {
                backgroundColor = 'bg-red-500';
              } else if (index === 2) {
                backgroundColor = 'bg-yellow-500';
              } else {
                backgroundColor = 'bg-white';
              }

              return (
                <div
                  key={index}
                  className={`flex justify-between items-center p-4 border-b border-gray-200 ${backgroundColor}`}
                >
                  <div>{team.teamName}</div>
                  <div>{team.score}</div>
                </div>
              );
            })
          ) : (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
