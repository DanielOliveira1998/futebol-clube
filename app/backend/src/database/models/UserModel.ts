import { IUser } from '../../Interfaces/IUser';
import { IUserModel } from '../../Interfaces/IUserModel';
import SequelizeUsers from './SequelizeUsers';

export default class UserModdel implements IUserModel {
  private model = SequelizeUsers;
  async findByEmail(email: string): Promise<IUser | null> {
    const dbData = await this.model.findOne({ where: { email } });
    return !dbData ? null : dbData;
  }
}
