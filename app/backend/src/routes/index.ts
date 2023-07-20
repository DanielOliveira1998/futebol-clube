import { Router } from 'express';
import teamRouter from './teamRoutes';
import loginRouter from './loginRoutes';
import LoginValidations from '../middlewares/validateLogin';

const router = Router();

router.use('/teams', teamRouter);
router.use(
  '/login',
  LoginValidations.validateEmail,
  LoginValidations.validatePassword,
  loginRouter,
);

export default router;
