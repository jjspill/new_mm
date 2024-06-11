import Link from 'next/link';

interface GolfTeamProps {
  teamName: string;
  teamID: string;
  teamMembers: string[];
  userID: string;
}

interface GolfLeagueProps {
  leagueName: string;
  leagueID: string;
  teams: GolfTeamProps[];
}

interface DisplayTeamProps {
  teamName: string;
  leagueName: string;
  teamId: string;
  leagueId: string;
}

interface GolfContainerProps {
  children: React.ReactNode;
  title: string;
}

interface GolfLeagueProps {
  leagueName: string;
  leagueID: string;
  teams: GolfTeamProps[];
}

export const GolfContainer: React.FC<GolfContainerProps> = ({
  children,
  title,
}) => {
  return (
    <div className="bg-white p-4 w-fit rounded-lg">
      <div className="flex flex-col items-center justify-center">
        <div className="text-2xl font-semibold">{title}</div>
        <div className="w-full h-[2px] bg-gray-800" />
        {children}
      </div>
    </div>
  );
};

export const GolfTeam: React.FC<DisplayTeamProps> = ({
  teamName,
  leagueName,
  teamId,
  leagueId,
}) => {
  return (
    <div className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg my-3">
      <Link
        href={`/golf/leaderboard?league=${leagueId}`}
        // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <div className="flex justify-start items-center">
          <p>{teamName}</p>
          <div className="bg-gray-800 w-[2px] h-4 mx-4" />
          <p>{leagueName}</p>
        </div>
      </Link>
    </div>
  );
};

export const GolfLeague: React.FC<GolfLeagueProps> = ({
  leagueName,
  leagueID,
  teams,
}) => {
  return (
    <div>
      <Link
        href={`/golf/leaderboard`}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <div className="flex justify-start items-center">
          <p>{leagueName}</p>
        </div>
      </Link>
    </div>
  );
};
