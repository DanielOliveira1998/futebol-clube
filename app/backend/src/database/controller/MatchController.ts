import { Request, Response } from 'express';
import MatchService from '../service/MatchService';

export default class TeamController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const response = await this.matchService.getAllMatches(inProgress as string);
    return res.status(200).json(response.data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const response = await this.matchService.finishMatch(Number(id));
    return res.status(200).json(response.data);
  }

  public async updateScoreboard(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const response = await this.matchService
      .updateScoreboard(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(200).json(response.data);
  }

  public async createMath(req: Request, res: Response) {
    const { homeTeamGoals, awayTeamGoals, homeTeamId, awayTeamId } = req.body;
    const response = await this.matchService
      .crateMath(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
    if (response.status === 'NOT_FOUND') {
      return res.status(404).json(response.data);
    }
    return res.status(201).json(response.data);
  }
}
