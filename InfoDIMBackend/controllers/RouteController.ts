import { Request, Response } from 'express';
import oracleDB from '../oracleDB';

export default {
  createRoute: async (req: Request, res: Response) => {
    const sql = `INSERT INTO routes (name, description, visible) VALUES (:name, :description, :visible)`;
    const binds = {...req.body};
    await oracleDB.execute(sql, binds);
    res.status(201).json({ message: 'Route créée avec succès', route: req.body });
  },
  getRoutes: async (req: Request, res: Response) => {
    const sql = `SELECT * FROM routes`;
    const result = await oracleDB.execute(sql);
    res.json(result.rows);
  },
  getRoute: async (req: Request, res: Response) => {
    const sql = `SELECT * FROM routes WHERE id = :id`;
    const binds = [req.params.id];
    const result = await oracleDB.execute(sql, binds);
    if (result.rows.length === 0) {
      res.status(404).json({ message: 'Route non trouvée' });
      return;
    }
    res.json({ message: 'Route récupérée avec succès', route: result.rows[0] });
  },
  updateRoute: async (req: Request, res: Response) => {
    const sql = `UPDATE routes SET name = :name, description = :description, visible = :visible WHERE id = :id`;
    const binds = {...req.body, id: req.params.id};
    await oracleDB.execute(sql, binds);
    res.json({ message: 'Route mise à jour avec succès', route: req.body });
  },
  deleteRoute: async (req: Request, res: Response) => {
    const sql = `DELETE FROM routes WHERE id = :id`;
    const binds = [req.params.id];
    await oracleDB.execute(sql, binds);
    res.status(204).json({ message: 'Route supprimée avec succès' });
  },
  updateRouteVisibility: async (req: Request, res: Response) => {
    const sql = `UPDATE routes SET visible = :visible WHERE id = :id`;
    const binds = {visible: req.body.visible, id: req.params.id};
    await oracleDB.execute(sql, Object.values(binds));
    res.json({ message: 'Route visibilité mise à jour avec succès', route: req.body });
  }
};
