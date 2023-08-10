import { Request, Response } from 'express';
import MatchService from '../service/MatchService';

export default class TeamController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const response = await this.matchService.getAllMatches(inProgress as string);
    res.status(200).json(response.data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const response = await this.matchService.finishMatch(Number(id));
    return res.status(200).json(response.data);
  }
}
