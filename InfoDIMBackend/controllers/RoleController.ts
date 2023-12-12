import { Request, Response, NextFunction } from 'express';
import RoleService from '../Service/RoleService';
import joi from 'joi';

const roleService = new RoleService();

const validateRoles = (req: Request, res: Response, next: Function) => {
  console.log('Validation des rôles');
  const schema = joi.object({
    name: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    console.error('Erreur de validation des rôles: ' + error.message);
    return res.status(400).json({ message: error.message });
  }
  console.log('Validation des rôles réussie');
  next();
}

const errorHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  fn(req, res, next).catch(next);

export default {
  createRole: [validateRoles, errorHandler(async (req: Request, res: Response) => {
    const role = await roleService.createRole(req.body);
    res.status(201).json({ message: 'Rôle créé avec succès', role: role });
  })],
  getRoles: errorHandler(async (req: Request, res: Response) => {
    const roles = await roleService.getRoles();
    res.json(roles);
  }),
  getRole: errorHandler(async (req: Request, res: Response) => {
    const role = await roleService.getRole(Number(req.params.id));
    res.json(role);
  }),
  updateRole: [validateRoles, errorHandler(async (req: Request, res: Response) => {
    const role = await roleService.updateRole(Number(req.params.id), req.body);
    res.json({ message: 'Rôle mis à jour avec succès', role: role });
  })],
  deleteRole: errorHandler(async (req: Request, res: Response) => {
    await roleService.deleteRole(Number(req.params.id));
    res.status(204).json({ message: 'Rôle supprimé avec succès' });
  })
};