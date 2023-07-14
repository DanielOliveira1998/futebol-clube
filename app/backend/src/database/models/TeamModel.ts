import { ITeam } from '../../Interfaces/ITeam';
import { ITeamModel } from '../../Interfaces/ITeamModel';
import SequelizeTeams from './SequelizeTeams';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeams;
  async findall(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async findById(id: ITeam['id']): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData === null) return null;
    return dbData;
  }
}
