import { FieldErrors } from 'tsoa';

export type ErrorMessageDTO = {
  status: number;
  message: string;
  description: string;
  fields?: FieldErrors;
};
