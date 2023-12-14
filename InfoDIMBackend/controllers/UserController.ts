import { Request, Response, NextFunction } from 'express';
import UserService from '../Service/UserService';
import joi from 'joi';
import validateRequest from '../middlewares/validateRequest';

const userService = new UserService();

const userSchema = joi.object({
  id: joi.number(),
  firstname: joi.string().required(),
  lastname: joi.string().required(),
  matricule: joi.string().required(),
  password: joi.string().required(),
});

const errorHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  fn(req, res, next).catch(next);

export default {
  createUser: [validateRequest(userSchema), errorHandler(async (req: Request, res: Response) => {
    console.log('Création d\'un utilisateur');
    const user = await userService.createUser(req.body);
    console.log('Utilisateur créé avec succès');
    res.status(201).json({ message: 'Utilisateur créé avec succès', user });
  })],
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
  updateUser: [validateRequest(userSchema), errorHandler(async (req: Request, res: Response) => {
    console.log('Mise à jour d\'un utilisateur');
    const user = await userService.updateUser(req.body);
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