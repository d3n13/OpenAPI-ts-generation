import { User, UserModel } from '../models/User';
import { Repository } from './repository';

class UserRepository extends Repository {
  public getByEmail = (email: string) => UserModel.findOne({ email });
  public create = (dto: User) => UserModel.create(dto);
}

export const userRepositoryFactory = async () => {
  const instance = new UserRepository();
  await instance.connect();
  return instance;
};
