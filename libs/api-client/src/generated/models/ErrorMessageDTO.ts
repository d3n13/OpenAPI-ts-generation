/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FieldErrors } from './FieldErrors';

export type ErrorMessageDTO = {
    fields?: FieldErrors;
    description: string;
    message: string;
    status: number;
}