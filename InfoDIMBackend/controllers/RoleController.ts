import { Request, Response } from 'express';
import { Role } from '../models/Roles';

export default {
  createRole: async (req: Request, res: Response) => {
    const role = new Role(req.body);
    await role.save();
    res.status(201).json(role);
  },
  getRoles: async (req: Request, res: Response) => {
    const roles = await Role.find();
    res.json(roles);
  },
  getRole: async (req: Request, res: Response) => {
    const role = await Role.findById(req.params.id);
    res.json(role);
  },
  updateRole: async (req: Request, res: Response) => {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(role);
  },
  deleteRole: async (req: Request, res: Response) => {
    await Role.findByIdAndDelete(req.params.id);
    res.status(204).send();
  }
};