import { Request, Response, NextFunction } from 'express';
import RoleService from '../Service/RoleService';
import joi from 'joi';

const roleService = new RoleService();

const validateRoles = (req: Request, res: Response, next: NextFunction) => {
  console.log('Validation des rôles');
  const schema = joi.object({
    name: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    console.error('Erreur de validation des rôles');
    return next(error);
  }
  console.log('Validation des rôles réussie');
  next();
}

const errorHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  fn(req, res, next).catch(next);

export default {
  createRole: [validateRoles, errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const role = await roleService.createRole(req.body);
      res.json({ message: 'Rôle créé avec succès', role: role });
    } catch (error) {
      next(error);
    }
  })],
  getRoles: errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roles = await roleService.getRoles();
      res.json(roles);
    } catch (error) {
      next(error);
    }
  }),
  getRole: errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const role = await roleService.getRole(Number(req.params.id));
      res.json(role);
    } catch (error) {
      next(error);
    }
  }),
  updateRole: [validateRoles, errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const role = await roleService.updateRole(Number(req.params.id), req.body);
      res.json({ message: 'Rôle mis à jour avec succès', role: role });
    } catch (error) {
      next(error);
    }
  })],
  deleteRole: errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      await roleService.deleteRole(Number(req.params.id));
      res.json({ message: 'Rôle supprimé avec succès' });
    } catch (error) {
      next(error);
    }
  })
};