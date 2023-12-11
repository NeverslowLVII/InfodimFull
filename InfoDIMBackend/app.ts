import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import routes from './routes/router';
import oracledb from 'oracledb';

const config = {
  user: process.env.ORACLEDB_USER,
  password: process.env.ORACLEDB_PASSWORD,
  connectString: process.env.ORACLEDB_CONNECTION_STRING,
};

class App {
  public express: express.Application;

  public constructor () {
    this.express = express();

    this.middlewares();
    this.database();
    this.routes();
  }

  private middlewares (): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private async database (): Promise<void> {
    try {
      await oracledb.createPool(config);
      console.log('Connexion à la base de données réussie');
    } catch (err) {
      console.error('Échec de la connexion à la base de données: ' + err.message);
    }
  }

  private routes (): void {
    this.express.use(routes);
  }
}

export default new App().express;