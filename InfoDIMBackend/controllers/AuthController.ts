import { Request, Response } from 'express';
import oracledb from 'oracledb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface User {
    ID: number;
    FIRSTNAME: string;
    LASTNAME: string;
    MATRICULE: string;
    PASSWORD: string;
  }
  
  class AuthController {
    async login(req: Request, res: Response) {
      const { username, password } = req.body;
  
      try {
        console.log('Tentative de connexion...');
        const connection = await oracledb.getConnection({
          user: process.env.ORACLEDB_USER,
          password: process.env.ORACLEDB_PASSWORD,
          connectString: process.env.ORACLEDB_CONNECTION_STRING,
        });
  
        console.log('Exécution de la requête SQL...');
        const result = await connection.execute(
          `SELECT * FROM USERS WHERE MATRICULE = :username`,
          { username: username },
          { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );
  
        console.log('Vérification des données :', result.rows);
        if (result.rows.length === 0) {
          console.log('Nom d\'utilisateur ou mot de passe invalide');
          return res.status(401).json({ message: 'Invalid username or password' });
        }
  
        const user = result.rows[0] as User;
        const passwordIsValid = await bcrypt.compare(password, user.PASSWORD);
  
        console.log('Vérification du mot de passe :', passwordIsValid);
        if (!passwordIsValid) {
          console.log('Nom d\'utilisateur ou mot de passe invalide');
          return res.status(401).json({ message: 'Invalid username or password' });
        }
  
        console.log('Génération du token...');
        const token = jwt.sign({ id: user.ID, username: user.MATRICULE }, process.env.JWT_SECRET, {
          expiresIn: 86400,
        });
  
        console.log('Connexion réussie');
        res.json({ auth: true, token });
      } catch (error) {
        console.error('Erreur interne du serveur', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
  
  export default new AuthController();