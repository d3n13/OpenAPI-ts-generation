import { FieldErrors } from 'tsoa';

export type BasicErrorMessageDTO = {
  status: number;
  message: string;
  description: string;
};

export type ValidationErrorMessageDTO = {
  status: number;
  message: string;
  description: string;
  fields?: FieldErrors;
};

export type ErrorMessageDTO = BasicErrorMessageDTO | ValidationErrorMessageDTO;

export type DeletedDTO = {
  id: string;
};

export type DoneDTO = {
  done: boolean;
};
