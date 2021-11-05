import { mongoose } from '@typegoose/typegoose';

// TODO
export const connect = () =>
  mongoose.connect('mongodb://localhost:27017/mongotest');
