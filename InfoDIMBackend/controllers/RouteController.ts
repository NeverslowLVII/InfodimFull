import { Request, Response, NextFunction } from 'express';
import RouteService from '../Service/RouteService';
import joi from 'joi';

const routeService = new RouteService();

const validateRoutes = (req: Request, res: Response, next: NextFunction) => {
  console.log('Validation des onglets');
  const schema = joi.object({
    routes: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    console.error('Erreur de validation des onglets');
    return next(error); // Changed to pass errors to Express's error handling middleware without logging the error message
  }
  console.log('Validation des onglets réussie');
  next();
}

const errorHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  fn(req, res, next).catch(next);

export default {
  createRoute: errorHandler(async (req: Request, res: Response, next: NextFunction) => { // Added next: NextFunction
    try {
      validateRoutes(req, res, next); // Modified to include next
      const route = await routeService.createRoute(req.body);
      res.json({ message: 'Onglet créé avec succès', route: route });
    } catch (error) {
      next(error); // Added to pass errors to Express's error handling middleware
    }
  }),
  getRoutes: errorHandler(async (req: Request, res: Response, next: NextFunction) => { // Added next: NextFunction
    try {
      const routes = await routeService.getRoutes();
      res.json(routes);
    } catch (error) {
      next(error); // Added to pass errors to Express's error handling middleware
    }
  }),
  getRoute: errorHandler(async (req: Request, res: Response, next: NextFunction) => { // Added next: NextFunction
    try {
      const route = await routeService.getRoute(Number(req.params.id));
      if (!route) {
        return res.json({ message: 'Onglet non trouvé' });
      }
      res.json({route});
    } catch (error) {
      next(error); // Added to pass errors to Express's error handling middleware
    }
  }),
  updateRoute: errorHandler(async (req: Request, res: Response, next: NextFunction) => { // Added next: NextFunction
    try {
      const route = await routeService.updateRoute(Number(req.params.id), req.body);
      res.json({ route });
    } catch (error) {
      next(error); // Added to pass errors to Express's error handling middleware
    }
  }),
  deleteRoute: errorHandler(async (req: Request, res: Response, next: NextFunction) => { // Added next: NextFunction
    try {
      await routeService.deleteRoute(Number(req.params.id));
      res.json({ message: 'Onglet supprimée avec succès' });
    } catch (error) {
      next(error); // Added to pass errors to Express's error handling middleware
    }
  }),
  updateRouteVisibility: errorHandler(async (req: Request, res: Response, next: NextFunction) => { // Added next: NextFunction
    try {
      const visibility = await routeService.updateRouteVisibility(Number(req.params.id), req.body.visible);
      res.json({ message: 'visibilité de l\'onglet mise à jour avec succès', visibility: visibility });
    } catch (error) {
      next(error); // Added to pass errors to Express's error handling middleware
    }
  })
};
