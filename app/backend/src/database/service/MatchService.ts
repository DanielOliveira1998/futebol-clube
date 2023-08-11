import { IMatch } from '../../Interfaces/IMatch';
import { ServiceResponse } from '../../Interfaces/ServiceResponse';
import { IMatchModel } from '../../Interfaces/IMatchModel';
import MatchModel from '../models/MatchModel';

export default class TeamService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
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
}
