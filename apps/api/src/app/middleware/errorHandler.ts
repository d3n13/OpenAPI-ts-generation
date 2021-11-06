import { NextFunction, Request, Response } from 'express';
import { extractErrorDTO } from '../errors/errors';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const dto = extractErrorDTO(err);
  return res.status(dto.status).json(dto);
}
