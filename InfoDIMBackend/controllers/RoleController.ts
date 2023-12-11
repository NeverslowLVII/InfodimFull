import { Request, Response } from 'express';
import oracleDB from '../oracleDB';

export default {
  createRole: async (req: Request, res: Response) => {
    const sql = `INSERT INTO roles (name) VALUES (:name)`;
    const binds = {...req.body};
    await oracleDB.execute(sql, binds);
    res.status(201).json({ message: 'Rôle créé avec succès', role: req.body });
  },
  getRoles: async (req: Request, res: Response) => {
    const sql = `SELECT * FROM roles`;
    const result = await oracleDB.execute(sql);
    res.json(result.rows);
  },
  getRole: async (req: Request, res: Response) => {
    const sql = `SELECT * FROM roles WHERE id = :id`;
    const binds = [req.params.id];
    const result = await oracleDB.execute(sql, binds);
    res.json(result.rows[0]);
  },
  updateRole: async (req: Request, res: Response) => {
    const sql = `UPDATE roles SET name = :name WHERE id = :id`;
    const binds = {name: req.body.name, id: req.params.id};
    await oracleDB.execute(sql, Object.values(binds));
    res.json({ message: 'Rôle mis à jour avec succès', role: req.body });
  },
  deleteRole: async (req: Request, res: Response) => {
    const sql = `DELETE FROM roles WHERE id = :id`;
    const binds = [req.params.id];
    await oracleDB.execute(sql, binds);
    res.status(204).json({ message: 'Rôle supprimé avec succès' });
  }
};