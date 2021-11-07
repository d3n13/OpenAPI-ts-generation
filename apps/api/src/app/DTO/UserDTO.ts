import { User } from '../mongodb/models/User';

export type CreateUserDTO = {
  email: string;
  password: string;
};

export type UpdatePasswordDTO = {
  old: string;
  new: string;
};

export type StrippedUserDTO = Omit<User, '_id' | 'password'>;
