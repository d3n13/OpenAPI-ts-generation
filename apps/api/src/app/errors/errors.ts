import { ValidateError } from 'tsoa';
import {
  BasicErrorMessageDTO,
  ValidationErrorMessageDTO,
} from '../DTO/MessageDTO';

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class InvalidCredentialsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidCredentialsError';
  }
}

const isMongoError = (error: any) => error?.name === 'MongoError';

export const extractErrorDTO = <T extends Error>(
  e: T
): BasicErrorMessageDTO | ValidationErrorMessageDTO => {
  if (e instanceof InvalidCredentialsError) {
    return {
      status: 401,
      description: e.message,
      message: 'Invalid Credentials',
    };
  }

  if (e instanceof NotFoundError) {
    return {
      status: 404,
      description: e.message,
      message: 'Not Found',
    };
  }

  if (e instanceof ValidateError) {
    return {
      status: 422,
      message: 'Validation Failed',
      description: e.message,
      fields: e.fields,
    };
  }

  if (isMongoError(e)) {
    return {
      status: 500,
      message: 'Database Error',
      description: e.message,
    };
  }

  return {
    status: 500,
    message: 'Internal Server Error',
    description: `${e?.message || e}`,
  };
};
