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
    console.error('Erreur de validation des rôles: ' + error.message);
    return res.status(400).json({ message: error.message });
  }
  console.log('Validation des rôles réussie');
  next();
};

const errorHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  fn(req, res, next).catch(next);

export default {
  createUser: errorHandler(async (req: Request, res: Response) => {
    console.log('Création d\'un utilisateur');
    const user = await userService.createUser(req.body);
    console.log('Utilisateur créé avec succès');
    res.status(201).json({ message: 'Utilisateur créé avec succès', user });
  }),
  getUsers: errorHandler(async (req: Request, res: Response) => {
    console.log('Récupération des utilisateurs');
    const users = await userService.getUsers();
    console.log('Utilisateurs récupérés avec succès');
    res.json(users);
  }),
  getUser: errorHandler(async (req: Request, res: Response) => {
    console.log('Récupération d\'un utilisateur par ID');
    const user = await userService.getUserById(Number(req.params.id));
    if (!user) {
      console.error('Utilisateur non trouvé');
      res.status(404).json({ message: 'Utilisateur non trouvé' });
      return;
    }
    console.log('Utilisateur récupéré avec succès');
    res.json({ message: 'Utilisateur récupéré avec succès', user });
  }),
  updateUser: [validateRoles, errorHandler(async (req: Request, res: Response) => {
    console.log('Mise à jour d\'un utilisateur');
    const user = await userService.updateUser(Number(req.params.id), req.body);
    console.log('Utilisateur mis à jour avec succès');
    res.json({ message: 'Utilisateur mis à jour avec succès', user });
  })],
  deleteUser: [errorHandler(async (req: Request, res: Response) => {
    console.log('Suppression d\'un utilisateur');
    await userService.deleteUser(Number(req.params.id));
    console.log('Utilisateur supprimé avec succès');
    res.status(204).end();
  })]
};
