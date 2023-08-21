import { ITeam } from '../Interfaces/ITeam';
import { IMatch } from '../Interfaces/IMatch';

function homeTeams(finishedMatches: IMatch[], allTeams: ITeam[]) {
  return allTeams.map((team) => {
    const name = team.teamName;
    const totalVictories = finishedMatches.filter((i) => i.homeTeamGoals > i.awayTeamGoals).length;
    const totalDraws = finishedMatches.filter((i) => i.awayTeamGoals === i.homeTeamGoals).length;
    const totalPoints = (totalVictories * 3) + totalDraws;
    const totalGames = finishedMatches.filter((i) => i.homeTeamId === team.id).length;
    const totalLosses = finishedMatches.filter((i) => i.homeTeamGoals < i.awayTeamGoals).length;
    const goalsFavor = finishedMatches.reduce((acc, value) => acc + value.homeTeamGoals, 0);
    const goalsOwn = finishedMatches.reduce((acc, value) => acc + value.awayTeamGoals, 0);
    return { name,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn };
  });
}

export default homeTeams;
