import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../db/database';
import bcrypt from 'bcrypt';
import { returnErrorResponse } from '../utils/error-response.util';

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const users: QueryResult<any> = await pool.query('SELECT * FROM "USER"');
    return res.send({
      data: users.rows,
      total: users.rowCount
    });
  } catch (error) {
    return returnErrorResponse(res, error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user: QueryResult<any> = await pool.query(
      'SELECT * FROM "USER" WHERE id = $1',
      [req.params.id]
    );
    return res.status(200).send({ data: user.rows[0] });
  } catch (error) {
    return returnErrorResponse(res, error);
  }
};

export const createUser = (req: Request, res: Response) => {
  try {
    const { names, lastNames, email, pass } = req.body;
    const password = bcrypt.hashSync(pass, 11);

    pool.query(
      'INSERT INTO "USER" (names, lastNames, email, pass) VALUES ($1, $2, $3, $4) RETURNING id, names, lastNames, email',
      [names, lastNames, email, password],
      (err: Error, result: QueryResult<any>) => {
        if (err) {
          return returnErrorResponse(res, err);
        }

        return res.status(201).send({
          data: result.rows[0]
        });
      }
    );
  } catch (error) {
    return returnErrorResponse(res, error);
  }
};

export const updateUser = (req: Request, res: Response) => {
  try {
    const { names, lastNames, email } = req.body;
    const { id } = req.params;

    pool.query(
      'UPDATE "USER" SET names = $1, lastNames = $2, email = $3 WHERE id = $4 RETURNING id, names, lastNames, email',
      [names, lastNames, email, id],
      (err: Error, result: QueryResult<any>) => {
        if (err) {
          return returnErrorResponse(res, err);
        }

        return res.status(201).send({
          data: result.rows[0]
        });
      }
    );
  } catch (error) {
    return returnErrorResponse(res, error);
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user: QueryResult<any> = await pool.query(
      'DELETE FROM "USER" WHERE id = $1 RETURNING id',
      [req.params.id]
    );

    if (!user.rows[0].id) {
      return res.send({
        message: 'El usuario no existe'
      });
    }
    return res.send({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    return returnErrorResponse(res, error);
  }
};
