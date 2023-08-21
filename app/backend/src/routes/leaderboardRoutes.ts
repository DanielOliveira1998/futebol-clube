import { Request, Router, Response } from 'express';
import LeaderboardController from '../database/controller/LeaderboardController';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.homeMatches(req, res),
);

export default router;
