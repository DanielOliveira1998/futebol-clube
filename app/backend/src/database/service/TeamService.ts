import { ITeam } from '../../Interfaces/ITeam';
import { ServiceResponse } from '../../Interfaces/ServiceResponse';
import { ITeamModel } from '../../Interfaces/ITeamModel';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findall();
    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
