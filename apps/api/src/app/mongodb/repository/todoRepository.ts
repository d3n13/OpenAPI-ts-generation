import { CreateTodoDTO } from 'src/app/DTO/TodoDTO';
import { TodoModel } from '../models/Todo';
import { Repository } from './repository';

class TodoRepository extends Repository {
  public create = (dto: CreateTodoDTO) => TodoModel.create(dto);
  public getAll = () => TodoModel.find();
  public remove = (id: string) => TodoModel.findByIdAndDelete(id);
  public getById = (id: string) => TodoModel.findById(id);
}

export const todoRepositoryFactory = async () => {
  const instance = new TodoRepository();
  await instance.connect();
  return instance;
};
