import { Request, Router, Response } from 'express';
import LoginController from '../database/controller/LoginController';
import LoginValidations from '../middlewares/validateLogin';
import validateToken from '../middlewares/validateToken';

const loginController = new LoginController();

const router = Router();

router.post(
  '/',
  LoginValidations.validateEmail,
  LoginValidations.validatePassword,
  (req: Request, res: Response) => loginController.login(req, res),
);
router.get(
  '/role',
  validateToken.validateAuthentication,
  (req: Request, res: Response) => loginController.loginRole(req, res),
);
export default router;
