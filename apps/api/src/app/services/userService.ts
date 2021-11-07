import { InvalidCredentialsError } from '../errors/errors';
import { CreateUserDTO, StrippedUserDTO } from '../DTO/UserDTO';
import { userRepositoryFactory } from '../mongodb/repository/userRepository';
import {
  hashPassword,
  passwordMatchesHash,
} from '../helpers/password/passwordHelpers';
import { stripUser } from '../mongodb/strippers/user/userStripper';

export class UserService {
  public create = async ({
    email,
    password,
  }: CreateUserDTO): Promise<StrippedUserDTO> => {
    const repo = await userRepositoryFactory();

    const hash = await hashPassword(password);

    const created = await repo.create({ email, password: hash });

    return stripUser(created);
  };

  public getByCredentials = async ({
    email,
    password,
  }: CreateUserDTO): Promise<StrippedUserDTO> => {
    const repo = await userRepositoryFactory();

    const errorMessage = `Invalid credentials`;

    const found = await repo.getByEmail(email.toLocaleLowerCase());

    if (!found) {
      throw new InvalidCredentialsError(errorMessage);
    }

    const match = await passwordMatchesHash(password, found.password);

    if (!match) {
      throw new InvalidCredentialsError(errorMessage);
    }

    return stripUser(found);
  };
}
