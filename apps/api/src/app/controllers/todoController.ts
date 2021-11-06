import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Put,
  Route,
  SuccessResponse,
} from 'tsoa';
import { DeletedDTO } from '../DTO/DeletedDTO';
import { ErrorMessageDTO } from '../DTO/ErrorMessageDTO';
import { CreateTodoDTO } from '../DTO/TodoDTO';
import { Todo } from '../mongodb/models/Todo';
import { TodoService } from '../services/todoService';

@Route('todos')
export class UsersController extends Controller {
  @Get()
  public async getAll(): Promise<Todo[] | ErrorMessageDTO> {
    return await new TodoService().getAll();
  }

  @Get('{todoId}')
  public async getById(
    @Path() todoId: string
  ): Promise<Todo | ErrorMessageDTO> {
    return await new TodoService().getById(todoId);
  }

  @Patch('{todoId}')
  public async patch(
    @Path() todoId: string,
    @Body() requestBody: CreateTodoDTO
  ): Promise<Todo | null | ErrorMessageDTO> {
    return await new TodoService().patch(todoId, requestBody);
  }

  @Put('{todoId}')
  public async replace(
    @Path() todoId: string,
    @Body() requestBody: CreateTodoDTO
  ): Promise<Todo | null | ErrorMessageDTO> {
    return await new TodoService().replace(todoId, requestBody);
  }

  @Delete('{todoId}')
  public async remove(
    @Path() todoId: string
  ): Promise<DeletedDTO | ErrorMessageDTO> {
    return await new TodoService().delete(todoId);
  }

  @SuccessResponse('201', 'Created')
  @Post()
  public async create(
    @Body() requestBody: CreateTodoDTO
  ): Promise<Todo | ErrorMessageDTO> {
    const item = await new TodoService().create(requestBody);
    this.setStatus(201);
    return item;
  }
}
