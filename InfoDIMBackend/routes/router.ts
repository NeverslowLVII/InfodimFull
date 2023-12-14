import { Router } from 'express';
import StatusController from '../controllers/StatusController';
import UserController from '../controllers/UserController';
import RoleController from '../controllers/RoleController';
import RouteController from '../controllers/RouteController';
import AuthController from '../controllers/AuthController';
import { authenticateJWT } from '../middlewares/authenticateJWT';

const routes = Router();

routes.get('/status', StatusController.status);

routes.post('/login', AuthController.login);

routes.post('/users', authenticateJWT, UserController.createUser);
routes.get('/users', UserController.getUsers);
routes.get('/users/:id', authenticateJWT, UserController.getUser);
routes.put('/users', authenticateJWT, UserController.updateUser);
routes.delete('/users/:id', authenticateJWT, UserController.deleteUser);

routes.post('/roles', authenticateJWT, RoleController.createRole);
routes.get('/roles', authenticateJWT, RoleController.getRoles);
routes.get('/roles/:id', authenticateJWT, RoleController.getRole);
routes.put('/roles/:id', authenticateJWT, RoleController.updateRole);
routes.delete('/roles/:id', authenticateJWT, RoleController.deleteRole);

routes.post('/routes', authenticateJWT, RouteController.createRoute);
routes.get('/routes', authenticateJWT, RouteController.getRoutes);
routes.get('/routes/:id', authenticateJWT, RouteController.getRoute);
routes.put('/routes/:id', authenticateJWT, RouteController.updateRoute);
routes.delete('/routes/:id', authenticateJWT, RouteController.deleteRoute);

export default routes;