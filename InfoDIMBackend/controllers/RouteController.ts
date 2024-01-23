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
    console.error('Erreur de validation des onglets: ' + error.message);
    return res.json({ message: error.message });
  }
  console.log('Validation des onglets réussie');
  next();
}

const errorHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  fn(req, res, next).catch(next);

export default {
  createRoute: errorHandler(async (req: Request, res: Response) => {
    validateRoutes(req, res, () => {});
    const route = await routeService.createRoute(req.body);
    res.json({ message: 'Onglet créé avec succès', route: route });
  }),
  getRoutes: errorHandler(async (req: Request, res: Response) => {
    const routes = await routeService.getRoutes();
    res.json(routes);
  }),
  getRoute: errorHandler(async (req: Request, res: Response) => {
    const route = await routeService.getRoute(Number(req.params.id));
    if (!route) {
      res.json({ message: 'Onglet non trouvé' });
      return;
    }
    res.json({route});
  }),
  updateRoute: errorHandler(async (req: Request, res: Response) => {
    const route = await routeService.updateRoute(Number(req.params.id), req.body);
    res.json({ route });
  }),
  deleteRoute: errorHandler(async (req: Request, res: Response) => {
    await routeService.deleteRoute(Number(req.params.id));
    res.json({ message: 'Onglet supprimée avec succès' });
  }),
  updateRouteVisibility: errorHandler(async (req: Request, res: Response) => {
    const visibility = await routeService.updateRouteVisibility(Number(req.params.id), req.body.visible);
    res.json({ message: 'visibilité de l\'onglet mise à jour avec succès', visibility: visibility });
  })
};
