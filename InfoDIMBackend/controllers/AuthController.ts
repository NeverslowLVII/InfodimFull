import { Request, Response, NextFunction } from 'express';
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
    async login(req: Request, res: Response, next: NextFunction) {
      const { username, password } = req.body;
  
      try {
        console.log('Tentative de connexion..');
        console.log('Username:', username);
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
  
        if (result.rows?.length === 0) {
          console.log('Nom d\'utilisateur invalide');
          return res.json({ message: 'Invalid username' });
        }
  
        const user = result.rows[0] as User;
        const passwordIsValid = await bcrypt.compare(password, user.PASSWORD);
        if (!passwordIsValid) {
          console.log('Échec de la validation du mot de passe');
          return res.json({ message: 'Invalid password' });
        }
  
        console.log('Génération du token...');
        const token = jwt.sign({ id: user.ID, username: user.MATRICULE }, process.env.JWT_SECRET as string, {
          expiresIn: 86400,
        });
  
        console.log('Connexion réussie');
        res.json({ auth: true, token, success: true });
      } catch (error) {
        console.error('Erreur interne du serveur', error);
        next(error); // Pass errors to Express's error handling middleware
      }
    }
  }
  
  export default new AuthController();