import { Router } from 'express';
import { verifyToken, verifyUser } from '../middlewares/auth.middleware';
import * as indexController from '../controllers/index.controller';
import * as authController from '../controllers/auth.controller';
import * as externalController from '../controllers/external.controller';

const router: Router = Router();

// RUTAS PARA CONTROLLER USUARIO
router.get('/user', [verifyToken], indexController.getAllUsers);
router.get('/user/:id', [verifyToken], indexController.getUserById);
router.post('/user', indexController.createUser);
router.patch(
  '/user/:id',
  [verifyToken, verifyUser],
  indexController.updateUser
);
router.delete('/user/:id', indexController.deleteUserById);
router.post('/auth/login', authController.login);
router.get('/external/findfood', externalController.consumeApiRest);

export default router;
