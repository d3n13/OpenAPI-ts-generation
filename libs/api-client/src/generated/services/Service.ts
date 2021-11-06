/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTodoDTO } from '../models/CreateTodoDTO';
import type { DeletedDTO } from '../models/DeletedDTO';
import type { Todo } from '../models/Todo';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class Service {
  /**
   * @returns Todo Ok
   * @throws ApiError
   */
  public static getAll(): CancelablePromise<Array<Todo>> {
    return __request({
      method: 'GET',
      path: `/todos`,
    });
  }

  /**
   * @param requestBody
   * @returns Todo Created
   * @throws ApiError
   */
  public static create(requestBody: CreateTodoDTO): CancelablePromise<Todo> {
    return __request({
      method: 'POST',
      path: `/todos`,
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Failed`,
      },
    });
  }

  /**
   * @param todoId
   * @returns Todo Ok
   * @throws ApiError
   */
  public static getById(todoId: string): CancelablePromise<Todo> {
    return __request({
      method: 'GET',
      path: `/todos/${todoId}`,
      errors: {
        404: `Not Found`,
      },
    });
  }

  /**
   * @param todoId
   * @param requestBody
   * @returns any Ok
   * @throws ApiError
   */
  public static patch(
    todoId: string,
    requestBody: CreateTodoDTO
  ): CancelablePromise<Todo | null> {
    return __request({
      method: 'PATCH',
      path: `/todos/${todoId}`,
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Failed`,
      },
    });
  }

  /**
   * @param todoId
   * @param requestBody
   * @returns any Ok
   * @throws ApiError
   */
  public static replace(
    todoId: string,
    requestBody: CreateTodoDTO
  ): CancelablePromise<Todo | null> {
    return __request({
      method: 'PUT',
      path: `/todos/${todoId}`,
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Failed`,
      },
    });
  }

  /**
   * @param todoId
   * @returns DeletedDTO Ok
   * @throws ApiError
   */
  public static remove(todoId: string): CancelablePromise<DeletedDTO> {
    return __request({
      method: 'DELETE',
      path: `/todos/${todoId}`,
    });
  }
}
