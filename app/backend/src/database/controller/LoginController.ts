import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import UserService from '../service/UserService';

const secret = process.env.JWT_SECRET || 'secret';

export default class LoginController {
  private userService = new UserService();

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const response = await this.userService.getUserByEmail(email, password);
    if (response.status !== 'SUCCESSFUL') {
      return res.status(401).json(response.data);
    }
    const token = jwt.sign({ id: response.data.id, email: response.data.email }, secret);
    res.status(200).json({ token });
  }

  public async loginRole(req: Request, res: Response) {
    const { user } = res.locals;
    const response = await this.userService.getUserRole(user.decoded.email);
    if (response.status !== 'SUCCESSFUL') {
      return res.status(401).json(response.data);
    }
    return res.status(200).json({ role: response.data.role });
  }
}
