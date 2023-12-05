import { Request, Response } from 'express';
import { User } from '../models/User';

export default {
  authenticate: async (req: Request, res: Response) => {
    const { matricule, password } = req.body;
    const user = await User.authenticate(matricule, password);
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ message: 'Matricule ou mot de passe incorrect' });
    }
  },
};