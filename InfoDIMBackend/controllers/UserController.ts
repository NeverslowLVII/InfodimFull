import { Request, Response } from 'express';
import { User } from '../models/User';
import mongoose from 'mongoose';

export default {
  createUser: async (req: Request, res: Response) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  },
  getUsers: async (req: Request, res: Response) => {
    const users = await User.find().populate('roles');
    res.json(users);
  },
  getUser: async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id).populate('roles', 'nom');
    res.json(user);
  },
  updateUser: async (req: Request, res: Response) => {
    if (req.body.roles) {
      req.body.roles = req.body.roles.filter((role: string) => 
        mongoose.Types.ObjectId.isValid(role)
      ).map((role: string) => new mongoose.Types.ObjectId(role));
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  },
  deleteUser: async (req: Request, res: Response) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
  }
};