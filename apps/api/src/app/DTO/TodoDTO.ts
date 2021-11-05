import { Todo } from '../mongodb/models/Todo';

export type CreateTodoDTO = Omit<Todo, '_id'>;
