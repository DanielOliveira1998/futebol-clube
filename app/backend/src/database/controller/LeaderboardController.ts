import { Request, Response } from 'express';
import LeaderboardService from '../service/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async homeMatches(req: Request, res: Response) {
    const response = await this.leaderboardService.getHomeScoreboard();
    return res.status(200).json(response.data);
  }

  public async awayMatches(req: Request, res: Response) {
    const response = await this.leaderboardService.getAwayScoreboard();
    return res.status(200).json(response.data);
  }
}
