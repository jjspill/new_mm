'use client';

import Link from 'next/link';
import { useUser } from '../contexts/UserContext';
import { useEffect, useState } from 'react';
import { GolfContainer, GolfTeam } from './components/Golf';
import { PageContainer } from '../components/templates/PageContainer';

interface UserGolfTeam {
  leagueId: string;
  players: string[];
  name: string;
  userId: string;
}

const GolfHomePage = () => {
  const { user, setUser } = useUser();
  const [userGolfData, setUserGolfData] = useState<UserGolfTeam[] | null>(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    fetch('/golf/api', {
      headers: {
        'Content-Type': 'application/json',
        Username: user.username,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserGolfData(data);
      })
      .catch((error) => {
        console.error('Error in /golf GET request: ', error);
      });
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center">
        <div className="flex flex-col max-w-2xl bg-white items-center justify-center mt-20 p-5 h-hit w-fit rounded-xl shadow-xl">
          <div className="p-5 text-center rounded-xl  h-fit w-fit">
            An account is required to access this page.
          </div>
          <Link href="/login" className="w-fit h-fit">
            <div className="p-5 h-fit w-fit bg-gray-200 hover:bg-gray-300 rounded-xl shadow-lg ">
              Sign In or Create Account
            </div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PageContainer className="bg-none shadow-none rounded-none max-w-lg">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="flex justify-center items-center space-x-4">
          {userGolfData && (
            <>
              <GolfContainer title="Teams">
                {userGolfData.map((team) => {
                  return (
                    <div key={team.leagueId}>
                      <GolfTeam
                        teamName={team.name}
                        leagueName={team.leagueId}
                        teamId={team.userId}
                        leagueId={team.leagueId}
                      />
                    </div>
                  );
                })}
              </GolfContainer>
              {/* <GolfContainer title="Leagues">
              {userGolfData.map((team) => {
                return (
                  <div key={team.leagueId}>
                    <Link href={`/golf/leagues/${team.leagueId}`}>
                      <GolfTeam
                        teamName={team.name}
                        leagueName={team.leagueId}
                        teamId={team.userId}
                        leagueId={team.leagueId}
                      />
                    </Link>
                  </div>
                );
              })}
            </GolfContainer> */}
            </>
          )}
        </div>
        <div className="w-full h-fit rounded-lg py-2 px-4 text-center shadow-xl">
          <Link href="/golf/join-league">
            <div className="bg-green-500 hover:bg-green-600 w-full rounded-lg my-2 px-4 py-2">
              <p className="text-white font-bold text-xl">Join League</p>
            </div>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
};

export default GolfHomePage;
