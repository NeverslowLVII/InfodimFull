import { Request, Response, NextFunction } from 'express';
import UserService from '../Service/UserService';
import Joi from 'joi';

const userService = new UserService();

const validateRoles = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    roles: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
};

const convertIdParam = (req: Request, res: Response, next: NextFunction) => {
  req.body.id = parseInt(req.params.id);
  next();
};

const errorHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  fn(req, res, next).catch(next);

export default {
  createUser: errorHandler(async (req: Request, res: Response) => {
    const user = await userService.createUser(req.body);
    res.status(201).json({ message: 'Utilisateur créé avec succès', user });
  }),
  getUsers: errorHandler(async (req: Request, res: Response) => {
    const users = await userService.getUsers();
    res.json(users);
  }),
  getUser: errorHandler(async (req: Request, res: Response) => {
    const user = await userService.getUserById(req.body.id);
    if (!user) {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
      return;
    }
    res.json({ message: 'Utilisateur récupéré avec succès', user });
  }),
  updateUser: [validateRoles, convertIdParam, errorHandler(async (req: Request, res: Response) => {
    const user = await userService.updateUser(req.body.id, req.body);
    res.json({ message: 'Utilisateur mis à jour avec succès', user });
  })],
  deleteUser: [convertIdParam, errorHandler(async (req: Request, res: Response) => {
    await userService.deleteUser(req.body.id);
    res.status(204).end();
  })]
};
