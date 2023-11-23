import { Request, Response } from 'express';
import { Route } from '../models/Routes';

export default {
  createRoute: async (req: Request, res: Response) => {
    const route = new Route(req.body);
    console.log('Nouvelle instance de Route créée avec les données reçues:', route);
    await route.save();
    console.log('Instance de Route sauvegardée dans la base de données:', route);
    res.status(201).json({ message: 'Route créée avec succès', route });
  },
  getRoutes: async (req: Request, res: Response) => {
    const routes = await Route.find();
    res.json(routes);
  },
  getRoute: async (req: Request, res: Response) => {
    const route = await Route.findById(req.params.id);
    if (!route) {
      res.status(404).json({ message: 'Route non trouvée' });
      return;
    }
    res.json({ message: 'Route récupérée avec succès', route });
  },
  updateRoute: async (req: Request, res: Response) => {
    const route = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!route) {
      res.status(404).json({ message: 'Route non trouvée pour la mise à jour' });
      return;
    }
    res.json({ message: 'Route mise à jour avec succès', route });
  },
  deleteRoute: async (req: Request, res: Response) => {
    const route = await Route.findByIdAndDelete(req.params.id);
    if (!route) {
      res.status(404).json({ message: 'Route non trouvée pour la suppression' });
      return;
    }
    res.status(204).json({ message: 'Route supprimée avec succès' });
  },
  updateRouteVisibility: async (req: Request, res: Response) => {
    const route = await Route.findById(req.params.id);
    if (!route) {
      res.status(404).json({ message: 'Route non trouvée' });
      return;
    }
    route.visible = req.body.visible;
    await route.save();
    res.json({ message: 'Route visibilité mise à jour avec succès', route });
    return;
  }
};