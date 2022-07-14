import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Creación de token
 *
 * @param response Objeto para creación Token
 * @returns string
 */
export const createToken = (response: any): string => {
  return jwt.sign(response, process.env.SEED_JWT as string, {
    expiresIn: process.env.EXPIRES_JWT
  });
};

/**
 * Verifica el token si es válido o no
 *
 * @param req Request de la petición
 * @param res Response para la petición
 * @param next Función para continuar con el siguiente Midddleware
 * @returns Response<any, Record<string, any>> | undefined
 */
export const verifyToken = (
  req: any,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | undefined => {
  const token = req.get('token');

  if (!token) {
    return res.status(401).json({
      status: false,
      message: 'El token es requerido'
    });
  }

  try {
    jwt.verify(
      token,
      process.env.SEED_JWT as string,
      (err: any, decoded: any) => {
        if (err) {
          return res.status(401).send({
            status: false,
            message: 'Token no válido',
            error: err?.message
          });
        }

        req.user = decoded;
        next();
      }
    );
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: 'Internal Server Error',
      error
    });
  }
};

export const verifyUser = (
  req: any,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | undefined => {
  if (req.user.email !== req.body.email) {
    return res.status(403).send({
      status: false,
      message: 'No tiene permisos para esta operación'
    });
  }

  next();
};
