import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import { IMatchModel } from '../../Interfaces/IMatchModel';
import { ITeamModel } from '../../Interfaces/ITeamModel';
import { ServiceResponse } from '../../Interfaces/ServiceResponse';
import homeTeams from '../../Utils/scoreboardConfig';

export default class LeaderboardService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async getScoreboard(): Promise<ServiceResponse<unknown>> {
    const finishedMatches = await this.matchModel.getAllFinishedMatches();
    const allTeams = await this.teamModel.findall();
    const homeScore = homeTeams(finishedMatches, allTeams);
    return { status: 'SUCCESSFUL', data: homeScore };
  }
}
