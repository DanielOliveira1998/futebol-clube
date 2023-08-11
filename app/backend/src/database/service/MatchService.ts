import { IMatch } from '../../Interfaces/IMatch';
import { ServiceResponse } from '../../Interfaces/ServiceResponse';
import { IMatchModel } from '../../Interfaces/IMatchModel';
import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import { ITeamModel } from '../../Interfaces/ITeamModel';

export default class TeamService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async getAllMatches(inProgress: string | undefined): Promise<ServiceResponse<IMatch[]>> {
    const filter = typeof inProgress === 'string' ? inProgress === 'true' : null;
    const allMatches = await this.matchModel.findall(filter);
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async finishMatch(id: number) {
    const dbData = await this.matchModel.finishMatch(id);
    return { status: 'SUCCESSFUL', data: dbData };
  }

  public async updateScoreboard(id: number, homeScore: number, awayScore: number) {
    const dbData = await this.matchModel.updateScoreboard(id, homeScore, awayScore);
    return { status: 'SUCCESSFUL', data: dbData };
  }

  public async crateMath(homeId:number, awayId: number, homeScore: number, awayScore: number)
    : Promise<ServiceResponse<IMatch>> {
    const homeTeam = await this.teamModel.findById(homeId);
    const awayTeam = await this.teamModel.findById(awayId);
    if (!homeTeam || !awayTeam) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const math = { homeTeamId: homeId,
      awayTeamId: awayId,
      homeTeamGoals: homeScore,
      awayTeamGoals: awayScore };
    const dbData = await this.matchModel.createMatch(math);
    return { status: 'SUCCESSFUL', data: dbData };
  }
}
