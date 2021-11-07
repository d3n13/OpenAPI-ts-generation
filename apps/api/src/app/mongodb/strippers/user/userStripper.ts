import { StrippedUserDTO } from 'src/app/DTO/UserDTO';
import { User } from 'src/app/mongodb/models/User';

export const stripUser = ({ email }: User): StrippedUserDTO => ({
  email,
});
