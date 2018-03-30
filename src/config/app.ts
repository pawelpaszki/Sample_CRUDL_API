import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
dotenv.config();
import * as cors from 'cors';
import * as express from 'express';
import * as mongoose from 'mongoose';
import user from '../routes/user';

class App {
  public express;

  constructor() {
    this.express = express();
    this.middleware();
    this.connectToDB();
    this.mountRoutes();
  }

  private connectToDB(): void {
    let connectionUrl: string = process.env.MONGODB_CONN_URL || 'mongodb://localhost/users';
    if (process.env.NODE_ENV === 'test') {
      connectionUrl += '-test';
    }
    mongoose.connect(connectionUrl, (err) => {
      if (!err) {
          console.log('Connected to MongoDB');
        }
    });
  }

  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: false}));
  }

  private mountRoutes(): void {
    this.express.use(cors());
    this.express.use('/api/users', user);
    this.express.use('/', (req, res) => {
      res.status(404).send({error: `path doesn't exist`});
    });
  }
}

export default new App().express;
