import { Request, Response } from 'express';
import { pool } from '../db/database';
import bcrypt from 'bcrypt';
import { returnErrorResponse } from '../utils/error-response.util';
import { createToken } from '../middlewares/auth.middleware';

export const login = (req: Request, res: Response) => {
  try {
    const { email, pass } = req.body;

    pool.query(
      'SELECT * FROM "USER" WHERE email = $1',
      [email],
      (err, result) => {
        if (err || !result) {
          return errorUserPassResponse(res, err);
        }

        if (!bcrypt.compareSync(pass, result.rows[0].pass)) {
          return errorUserPassResponse(res);
        }
        delete result.rows[0].pass;
        const token = createToken(result.rows[0]);

        return res.status(201).send({ data: result.rows[0], token });
      }
    );
  } catch (error) {
    return returnErrorResponse(res, error);
  }
};

function errorUserPassResponse(
  res: Response<any, Record<string, any>>,
  err?: Error
):
  | Response<any, Record<string, any>>
  | PromiseLike<Response<any, Record<string, any>>> {
  return res.status(401).send({
    message: 'Usuario y/o contraseña invalidos',
    error: err ? err.message : null
  });
}
