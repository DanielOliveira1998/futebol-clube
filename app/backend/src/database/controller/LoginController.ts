import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import UserService from '../service/UserService';

const secret = process.env.JWT_SECRET || 'secret';

export default class LoginController {
  private userModel = new UserService();

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const response = await this.userModel.getUserByEmail(email, password);
    if (response.status !== 'SUCCESSFUL') {
      return res.status(401).json(response.data);
    }
    const token = jwt.sign({ id: response.data.id, email: response.data.email }, secret);
    res.status(200).json({ token });
  }
}
