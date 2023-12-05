import express from 'express';
import cors from 'cors';
import routes from './routes/router';

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

  private database (): void {
    mongoose.connect('mongodb://127.0.0.1:27017/chs');
  }

  private routes (): void {
    this.express.use(routes);
  }
}

export default new App().express;