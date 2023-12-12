import express from 'express';
import cors from 'cors';
import routes from './routes/router';
import { csrfProtection } from './middleswares/csurf';
import cookieParser from 'cookie-parser'; // Ajoutez cette ligne

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
    this.express.use(cookieParser());
    this.express.use(cors({
      allowedHeaders: ['Content-Type', 'csrf-token']
    }));
    this.express.use(csrfProtection);
  }

  private database (): void {
    mongoose.connect('mongodb://127.0.0.1:27017/chs');
  }

  private routes (): void {
    this.express.get('/csrf-token', csrfProtection, (req, res) => {
      res.json({ csrfToken: req.csrfToken() });
    });
    this.express.use(routes);
  }
}

export default new App().express;