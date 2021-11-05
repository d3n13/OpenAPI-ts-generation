import { prop, getModelForClass } from '@typegoose/typegoose';

export class Todo {
  public _id?: string;

  @prop({
    required: true,
  })
  public title!: string;

  @prop()
  public done?: boolean;
}

export const TodoModel = getModelForClass(Todo);
