import { CreateTodoDTO } from 'src/app/DTO/TodoDTO';
import { TodoModel } from '../models/Todo';
import { Repository } from './repository';

class TodoRepository extends Repository {
  public create = (dto: CreateTodoDTO) => TodoModel.create(dto);
  public getAll = () => TodoModel.find();
  public getById = (id: string) => TodoModel.findById(id);
  public edit = (id: string, dto: CreateTodoDTO, overwrite = false) =>
    TodoModel.findByIdAndUpdate(id, dto, {
      new: true,
      overwrite,
    });
  public remove = (id: string) => TodoModel.findByIdAndDelete(id);
}

export const todoRepositoryFactory = async () => {
  const instance = new TodoRepository();
  await instance.connect();
  return instance;
};
