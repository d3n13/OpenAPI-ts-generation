import { prop, getModelForClass } from '@typegoose/typegoose';

export class User {
  public _id?: string;

  @prop({
    required: true,
    unique: true,
    lowercase: true,
  })
  public email!: string;

  @prop({
    required: true,
  })
  public password!: string;
}

export const UserModel = getModelForClass(User);
