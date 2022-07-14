import { Response } from 'express';
import logger from '../log/logger';

export function returnErrorResponse(
  res: Response<any, Record<string, any>>,
  error: any
):
  | Response<any, Record<string, any>>
  | PromiseLike<Response<any, Record<string, any>>> {

    logger.error(error);

  return res.status(500).send({
    message: 'Falla de servicio',
    error
  });
}
