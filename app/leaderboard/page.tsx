import scoreboard_config from './scoreboard_config.json';
import temp_data from './temp_data.json';
import {
  assignScoresToTeams,
  convertUTCDateToLocalDate,
  getScores,
} from './helpers';
import { ScoreboardRow } from './components/ScoreboardRow';

async function getData() {
  const res = await fetch('https://james-spillmann.com/leaderboard/api', {
    headers: {
      'Content-Type': 'application/json',
      method: 'GET',
    },
    cache: 'no-store', // To disable caching, use no-store or other caching options as per requirement
  });

  if (!res.ok) {
    throw new Error('Failed to fetch leaderboard data');
  }

  const data = await res.json();
  if (!data.data?.results?.leaderboard) {
    console.error('No data available?');
  } else return data.data; // Adjusted to match the data structure returned from the API route
}

async function scoreBoard() {
  const data = await getData();

  if (!data?.results?.leaderboard) {
    return <div className="pt-20">No data available</div>;
  }
  const updated = convertUTCDateToLocalDate(
    data.results.tournament.live_details?.updated,
  );
  console.log('updated', updated);
  const scores = getScores(data);
  const scoreboard_data = assignScoresToTeams(scoreboard_config, scores);

  return (
    <div className="flex justify-center pt-20 pb-4">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-4xl">
        <div className="text-center rounded-t-2xl py-4">
          <h1 className="text-2xl font-semibold">Scoreboard</h1>
          <p className="text-sm">Last updated: {updated}</p>
        </div>
        {scoreboard_data.map((row, index) => (
          <ScoreboardRow key={index} {...row} />
        ))}
      </div>
    </div>
  );
}

export default scoreBoard;
