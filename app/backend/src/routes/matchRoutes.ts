import { Request, Router, Response } from 'express';
import MatchController from '../database/controller/MatchController';
import validateToken from '../middlewares/validateToken';

const matchController = new MatchController();

const router = Router();

router.patch(
  '/:id/finish',
  validateToken.validateAuthentication,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

router.get(
  '/',
  (req: Request, res: Response) => matchController.getAllMatches(req, res),
);

export default router;
