import {
  Body,
  Controller,
  Post,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa';
import { CreateUserDTO, StrippedUserDTO } from '../DTO/UserDTO';
import {
  BasicErrorMessageDTO,
  ErrorMessageDTO,
  ValidationErrorMessageDTO,
} from '../DTO/MessageDTO';

import { UserService } from '../services/userService';

@Tags('auth')
@Response<ErrorMessageDTO>('5XX')
@Route('auth')
export class UsersController extends Controller {
  @Response<ValidationErrorMessageDTO>(422, 'Validation Failed')
  @SuccessResponse('201', 'Created')
  @Post('register')
  public async register(
    @Body() requestBody: CreateUserDTO
  ): Promise<StrippedUserDTO> {
    const item = await new UserService().create(requestBody);
    this.setStatus(201);
    return item;
  }

  @Response<ValidationErrorMessageDTO>(422, 'Validation Failed')
  @Response<BasicErrorMessageDTO>(401, 'Invalid Credentials')
  @Post('login')
  public async login(
    @Body() requestBody: CreateUserDTO
  ): Promise<StrippedUserDTO> {
    return await new UserService().getByCredentials(requestBody);
  }
}
