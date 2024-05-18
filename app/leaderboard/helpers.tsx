export interface ScoreboardRowData {
  team_name: string;
  total_score: number;
  players?: PlayerData[];
}

export interface PlayerData {
  first_name: string;
  last_name: string;
  score: number;
  status: string;
}

export interface Scores {
  [key: string]: PlayerData;
}

function getTotalOfLowestScores(scores: number[]): number {
  const sortedScores = scores.sort((a, b) => a - b);
  const lowest5Scores = sortedScores.slice(0, 5);
  const total = lowest5Scores.reduce((acc, score) => acc + score, 0);
  return total;
}

function sortTeamsByScore(
  scoreBoard: ScoreboardRowData[],
): ScoreboardRowData[] {
  return scoreBoard.sort((a, b) => a.total_score - b.total_score);
}

export function getScores(data: any): Scores {
  const scores = data.results.leaderboard.reduce((acc: any, item: any) => {
    const key = `${item.first_name.toLowerCase()}_${item.last_name.toLowerCase()}`;
    acc[key] = {
      first_name: item.first_name,
      last_name: item.last_name,
      score: item.total_to_par,
      status: item.status,
    };
    return acc;
  }, {});

  return scores;
}

export function assignScoresToTeams(config: any, scores: Scores) {
  const highestScore = getHighestActiveScore(scores);
  if (!highestScore) {
    console.log('No active scores found');
    return [];
  }
  const teams = config.teams.map((team: any) => {
    const teamScores = team.players.map((player: any) => {
      const key = `${player.first_name.toLowerCase()}_${player.last_name.toLowerCase()}`;
      const score = scores[key];
      if (score.status !== 'active') {
        score.score = highestScore.score;
      }
      player.score = score.score;
      player.status = score.status;
      if (score) {
        return score.score;
      } else {
        console.log('No score found for', key);
        return 0;
      }
    });
    const total = getTotalOfLowestScores(teamScores);

    return {
      ...team,
      total_score: total,
    };
  });

  return sortTeamsByScore(teams);
}

export function getHighestActiveScore(
  scores: Scores,
): { name: string; score: number } | null {
  let highestScore = -Infinity;
  let highestScorer = null;

  for (const [name, data] of Object.entries(scores)) {
    if (data.status === 'active' && data.score > highestScore) {
      highestScore = data.score;
      highestScorer = { name, score: data.score };
    }
  }

  return highestScorer;
}
