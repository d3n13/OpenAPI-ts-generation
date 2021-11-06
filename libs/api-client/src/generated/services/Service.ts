/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTodoDTO } from '../models/CreateTodoDTO';
import type { DeletedDTO } from '../models/DeletedDTO';
import type { ErrorMessageDTO } from '../models/ErrorMessageDTO';
import type { Todo } from '../models/Todo';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class Service {

    /**
     * @returns any Ok
     * @throws ApiError
     */
    public static getAll(): CancelablePromise<(Array<Todo> | ErrorMessageDTO)> {
        return __request({
            method: 'GET',
            path: `/todos`,
        });
    }

    /**
     * @param requestBody 
     * @returns any Created
     * @throws ApiError
     */
    public static create(
requestBody: CreateTodoDTO,
): CancelablePromise<(Todo | ErrorMessageDTO)> {
        return __request({
            method: 'POST',
            path: `/todos`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param todoId 
     * @returns any Ok
     * @throws ApiError
     */
    public static getById(
todoId: string,
): CancelablePromise<(Todo | ErrorMessageDTO)> {
        return __request({
            method: 'GET',
            path: `/todos/${todoId}`,
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
requestBody: CreateTodoDTO,
): CancelablePromise<(Todo | ErrorMessageDTO) | null> {
        return __request({
            method: 'PATCH',
            path: `/todos/${todoId}`,
            body: requestBody,
            mediaType: 'application/json',
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
requestBody: CreateTodoDTO,
): CancelablePromise<(Todo | ErrorMessageDTO) | null> {
        return __request({
            method: 'PUT',
            path: `/todos/${todoId}`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param todoId 
     * @returns any Ok
     * @throws ApiError
     */
    public static remove(
todoId: string,
): CancelablePromise<(DeletedDTO | ErrorMessageDTO)> {
        return __request({
            method: 'DELETE',
            path: `/todos/${todoId}`,
        });
    }

}