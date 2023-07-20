import bcrypt = require('bcryptjs');
import { IUser } from '../../Interfaces/IUser';
import { ServiceResponse } from '../../Interfaces/ServiceResponse';
import { IUserModel } from '../../Interfaces/IUserModel';
import UserModel from '../models/UserModel';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async getUserByEmail(email: string, password: string): Promise<ServiceResponse<IUser>> {
    const user = await this.userModel.findByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { status: 'NOT_FOUND', data: { message: 'Invalid email or password' } };
    }
    return { status: 'SUCCESSFUL', data: user };
  }
}
