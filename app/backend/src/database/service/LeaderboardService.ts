import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import { IMatchModel } from '../../Interfaces/IMatchModel';
import { ITeamModel } from '../../Interfaces/ITeamModel';
import { ServiceResponse } from '../../Interfaces/ServiceResponse';
import homeTeamSort from '../../Utils/scoreboardConfig';
import awayTeamSort from '../../Utils/awayScoreboardConfig';

export default class LeaderboardService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async getHomeScoreboard(): Promise<ServiceResponse<unknown>> {
    const finishedMatches = await this.matchModel.getAllFinishedMatches();
    const allTeams = await this.teamModel.findall();
    const homeScore = homeTeamSort(finishedMatches, allTeams);
    return { status: 'SUCCESSFUL', data: homeScore };
  }

  public async getAwayScoreboard(): Promise<ServiceResponse<unknown>> {
    const finishedMatches = await this.matchModel.getAllFinishedMatches();
    const allTeams = await this.teamModel.findall();
    const awayScore = awayTeamSort(finishedMatches, allTeams);
    return { status: 'SUCCESSFUL', data: awayScore };
  }
}
