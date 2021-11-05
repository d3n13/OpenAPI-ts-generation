import { DeletedDTO } from '../DTO/DeletedDTO';
import { CreateTodoDTO } from '../DTO/TodoDTO';
import { NotFoundError } from '../errors/errors';
import { todoRepositoryFactory } from '../mongodb/repository/todoRepository';
import { Todo } from '../mongodb/models/Todo';

export class TodoService {
  public create = async (dto: CreateTodoDTO): Promise<Todo> => {
    const repo = await todoRepositoryFactory();
    return await repo.create(dto);
  };

  public delete = async (id: string): Promise<DeletedDTO> => {
    const repo = await todoRepositoryFactory();
    await repo.remove(id);
    return {
      id,
    };
  };

  public getAll = async (): Promise<Todo[]> => {
    const repo = await todoRepositoryFactory();
    return await repo.getAll();
  };

  public getById = async (id: string): Promise<Todo> => {
    const repo = await todoRepositoryFactory();

    const found = await repo.getById(id);

    if (!found) {
      throw new NotFoundError(`No item with _id=${id} found`);
    }

    return found;
  };
}
