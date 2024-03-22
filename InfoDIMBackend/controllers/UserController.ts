import { Request, Response, NextFunction } from 'express';
import UserService from '../Service/UserService';
import Joi from 'joi';

const userService = new UserService();

const validateRoles = (req: Request, res: Response, next: NextFunction) => {
  console.log('Validation des rôles');
  const schema = Joi.object({
    roles: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    console.error('Erreur de validation des rôles');
    return next(error); // Pass errors to Express's error handling middleware
  }
  console.log('Validation des rôles réussie');
  next();
};

const errorHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  fn(req, res, next).catch(next); // Pass errors to Express's error handling middleware

export default {
  createUser: errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log('Création d\'un utilisateur');
    try {
      const user = await userService.createUser(req.body);
      console.log('Utilisateur créé avec succès');
      res.json({ message: 'Utilisateur créé avec succès', user });
    } catch (error) {
      next(error); // Pass errors to Express's error handling middleware
    }
  }),
  getUsers: errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log('Récupération des utilisateurs');
    try {
      const users = await userService.getUsers();
      console.log('Utilisateurs récupérés avec succès');
      res.json(users);
    } catch (error) {
      next(error); // Pass errors to Express's error handling middleware
    }
  }),
  getUser: errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log('Récupération d\'un utilisateur par ID');
    try {
      const user = await userService.getUserById(Number(req.params.id));
      if (!user) {
        console.error('Utilisateur non trouvé');
        return next(new Error('Utilisateur non trouvé')); // Pass errors to Express's error handling middleware
      }
      console.log('Utilisateur récupéré avec succès');
      res.json({ user });
    } catch (error) {
      next(error); // Pass errors to Express's error handling middleware
    }
  }),
  updateUser: [validateRoles, errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log('Mise à jour d\'un utilisateur');
    try {
      const user = await userService.updateUser(Number(req.params.id), req.body);
      console.log('Utilisateur mis à jour avec succès');
      res.json({ message: 'Utilisateur mis à jour avec succès', user });
    } catch (error) {
      next(error); // Pass errors to Express's error handling middleware
    }
  })],
  deleteUser: [errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log('Suppression d\'un utilisateur');
    try {
      await userService.deleteUser(Number(req.params.id));
      console.log('Utilisateur supprimé avec succès');
      res.end();
    } catch (error) {
      next(error); // Pass errors to Express's error handling middleware
    }
  })]
};
