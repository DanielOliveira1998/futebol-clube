import { IMatch } from '../../Interfaces/IMatch';
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
}
