import { Request, Router, Response } from 'express';
import MatchController from '../database/controller/MatchController';
import validateToken from '../middlewares/validateToken';

const matchController = new MatchController();

const router = Router();

router.patch(
  '/:id',
  validateToken.validateAuthentication,
  (req: Request, res: Response) => matchController.updateScoreboard(req, res),
);

router.patch(
  '/:id/finish',
  validateToken.validateAuthentication,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

router.get(
  '/',
  (req: Request, res: Response) => matchController.getAllMatches(req, res),
);

router.post(
  '/',
  validateToken.validateAuthentication,
  (req: Request, res: Response) => matchController.createMath(req, res),
);

export default router;
