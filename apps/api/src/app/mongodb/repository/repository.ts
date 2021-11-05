import { connect } from '../helpers/connect';

export abstract class Repository {
  public connect = async () => {
    await connect();
  };
}
