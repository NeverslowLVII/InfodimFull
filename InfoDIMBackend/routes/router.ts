// Importation des modules nécessaires
import { Router } from 'express';
import StatusController from '../controllers/StatusController';
import UserController from '../controllers/UserController';
import RoleController from '../controllers/RoleController';
import RouteController from '../controllers/RouteController';
import AuthController from '../controllers/AuthController';

// Création du routeur
const routes = Router();

// Routes pour le statut
routes.get('/status', StatusController.status);

// Routes pour l'authentification
routes.post('/login', AuthController.login);

// Routes pour les utilisateurs
routes.post('/users', UserController.createUser);
routes.get('/users', UserController.getUsers);
routes.get('/users/:id', UserController.getUser);
routes.put('/users/:id', UserController.updateUser);
routes.delete('/users/:id', UserController.deleteUser);

// Routes pour les rôles
routes.post('/roles', RoleController.createRole);
routes.get('/roles', RoleController.getRoles);
routes.get('/roles/:id', RoleController.getRole);
routes.put('/roles/:id', RoleController.updateRole);
routes.delete('/roles/:id', RoleController.deleteRole);

// Routes pour les onglets
routes.post('/routes', RouteController.createRoute);
routes.get('/routes', RouteController.getRoutes);
routes.get('/routes/:id', RouteController.getRoute);
routes.put('/routes/:id', RouteController.updateRoute);
routes.delete('/routes/:id', RouteController.deleteRoute);
routes.put('/route/:id/visibility', RouteController.updateRouteVisibility);

// Exportation du routeur
export default routes;