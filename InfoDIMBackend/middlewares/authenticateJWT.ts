import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const jwtSecret: Secret = process.env.JWT_SECRET;
    console.log('Authentification JWT en cours...');

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        console.log('Token trouvé, vérification en cours...');

        jwt.verify(token, jwtSecret, (err, user) => {
            if (err) {
                console.error('Erreur lors de la vérification du token:', err);
                return res.sendStatus(403);
            }

            console.log('Token vérifié avec succès, utilisateur:', user);
            req.user = user;
            next();
        });
    } else {
        console.log('Aucun token trouvé, envoi du statut 401...');
        res.sendStatus(401);
    }
};