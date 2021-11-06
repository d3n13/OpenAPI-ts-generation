import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Put,
  Response,
  Route,
  SuccessResponse,
} from 'tsoa';
import { DeletedDTO } from '../DTO/DeletedDTO';
import { ErrorMessageDTO } from '../DTO/ErrorMessageDTO';
import { CreateTodoDTO } from '../DTO/TodoDTO';
import { Todo } from '../mongodb/models/Todo';
import { TodoService } from '../services/todoService';

@Response<ErrorMessageDTO>('5XX')
@Route('todos')
export class UsersController extends Controller {
  @Get()
  public async getAll(): Promise<Todo[]> {
    return await new TodoService().getAll();
  }

  @Response<ErrorMessageDTO>(404, 'Not Found')
  @Get('{todoId}')
  public async getById(@Path() todoId: string): Promise<Todo> {
    return await new TodoService().getById(todoId);
  }

  @Response(204, 'No Content')
  @Response<ErrorMessageDTO>(422, 'Validation Failed')
  @Patch('{todoId}')
  public async patch(
    @Path() todoId: string,
    @Body() requestBody: CreateTodoDTO
  ): Promise<Todo | null> {
    return await new TodoService().patch(todoId, requestBody);
  }

  @Response(204, 'No Content')
  @Response<ErrorMessageDTO>(422, 'Validation Failed')
  @Put('{todoId}')
  public async replace(
    @Path() todoId: string,
    @Body() requestBody: CreateTodoDTO
  ): Promise<Todo | null> {
    return await new TodoService().replace(todoId, requestBody);
  }

  @Delete('{todoId}')
  public async remove(@Path() todoId: string): Promise<DeletedDTO> {
    return await new TodoService().delete(todoId);
  }

  @Response<ErrorMessageDTO>(422, 'Validation Failed')
  @SuccessResponse('201', 'Created')
  @Post()
  public async create(@Body() requestBody: CreateTodoDTO): Promise<Todo> {
    const item = await new TodoService().create(requestBody);
    this.setStatus(201);
    return item;
  }
}
