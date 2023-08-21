import { ITeam } from '../Interfaces/ITeam';
import { IMatch } from '../Interfaces/IMatch';

function totalVictoriesCount(team: any, finishedMatches: IMatch[]) {
  return finishedMatches
    .filter((i) => i.homeTeamGoals > i.awayTeamGoals && i.homeTeamId === team.id).length;
}

function totalDrawsCount(team: any, finishedMatches: IMatch[]) {
  return finishedMatches
    .filter((i) => i.awayTeamGoals === i.homeTeamGoals && i.homeTeamId === team.id).length;
}

function totalLossesCount(team: any, finishedMatches: IMatch[]) {
  return finishedMatches
    .filter((i) => i.homeTeamGoals < i.awayTeamGoals && i.homeTeamId === team.id).length;
}

function goalsFavorCount(team: any, finishedMatches: IMatch[]) {
  const totalGames = (finishedMatches.filter((i) => i.homeTeamId === team.id));
  return totalGames.reduce((acc, value) => acc + value.homeTeamGoals, 0);
}

function goalsOwnCount(team: any, finishedMatches: IMatch[]) {
  const totalGames = (finishedMatches.filter((i) => i.homeTeamId === team.id));
  return totalGames.reduce((acc, value) => acc + value.awayTeamGoals, 0);
}

function homeTeams(finishedMatches: IMatch[], allTeams: ITeam[]) {
  return allTeams.map((team) => {
    const totalVictories = totalVictoriesCount(team, finishedMatches);
    const totalDraws = totalDrawsCount(team, finishedMatches);
    const totalGames = (finishedMatches.filter((i) => i.homeTeamId === team.id)).length;
    const totalLosses = totalLossesCount(team, finishedMatches);
    const goalsFavor = goalsFavorCount(team, finishedMatches);
    const goalsOwn = goalsOwnCount(team, finishedMatches);
    return { name: team.teamName,
      totalPoints: (totalVictories * 3) + totalDraws,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: ((((totalVictories * 3) + totalDraws) / (totalGames * 3)) * 100).toFixed(2) };
  });
}

function homeTeamSort(finishedMatches: IMatch[], allTeams: ITeam[]) {
  const score = homeTeams(finishedMatches, allTeams);
  return score.sort((a, b) =>
    b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor);
}

export default homeTeamSort;
