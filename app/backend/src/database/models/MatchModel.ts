import { IMatch } from '../../Interfaces/IMatch';
import { ICreatedMatch } from '../../Interfaces/ICretedMatch';
import { IMatchModel } from '../../Interfaces/IMatchModel';
import SequelizeMatches from './SequelizeMatches';
import SequelizeTeams from './SequelizeTeams';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatches;
  async findall(filter: boolean | null): Promise<IMatch[]> {
    const filterSelect = typeof filter === 'boolean' ? { where: { inProgress: filter },
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
      ] } : {
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
      ] };
    const dbData = await this.model.findAll({ ...filterSelect });
    return dbData;
  }

  async finishMatch(id: number) {
    await this.model.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  }

  async updateScoreboard(id: number, homeScore: number, awayScore: number) {
    await this.model.update(
      { homeTeamGoals: homeScore, awayTeamGoals: awayScore },
      { where: { id } },
    );
    return { message: 'Scoreboard updated' };
  }

  async createMatch(math: ICreatedMatch) {
    const mathCreated = await this.model.create({
      homeTeamId: math.homeTeamId,
      awayTeamId: math.awayTeamId,
      homeTeamGoals: math.homeTeamGoals,
      awayTeamGoals: math.awayTeamGoals,
      inProgress: true,
    });
    return mathCreated;
  }

  public async getAllFinishedMatches(): Promise<IMatch[]> {
    const finishedMatches = await this.model.findAll({
      where: { inProgress: false },
      include: [
        { model: SequelizeTeams, as: 'homeTeam' },
        { model: SequelizeTeams, as: 'awayTeam' },
      ],
    });
    return finishedMatches;
  }
}
