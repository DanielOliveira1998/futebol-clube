import { Router } from 'express';
import teamRouter from './teamRoutes';
import loginRouter from './loginRoutes';
import matchRouter from './matchRoutes';
import leaderboardRouter from './leaderboardRoutes';

const router = Router();

router.use('/teams', teamRouter);
router.use(
  '/login',
  loginRouter,
);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
