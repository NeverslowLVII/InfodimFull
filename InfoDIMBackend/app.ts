import dotenv from 'dotenv';
dotenv.config();
console.log('Configuration de dotenv chargée');

import express from 'express';
import cors from 'cors';
import routes from './routes/router';
import { initialize, close } from './oracleDB';

class App {
  public express: express.Application;

  public constructor () {
    this.express = express();
    console.log('Express initialisé');

    this.middlewares();
    this.database();
    this.routes();
  }

  private middlewares (): void {
    this.express.use(express.json());
    this.express.use(cors());
    console.log('Middlewares chargés');
  }

  private async database (): Promise<void> {
    try {
      await initialize();
      console.log('Base de données initialisée');
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de la base de données', error);
    }
  }

  private routes (): void {
    this.express.use(routes);
    console.log('Routes chargées');
  }
}

process.on('SIGINT', async () => {
  try {
    await close();
    console.log('Base de données fermée');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de la fermeture de la base de données', error);
    process.exit(1);
  }
});

export default new App().express;
console.log('Application démarrée');
