import * as dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import { createConnection } from 'typeorm';
import { expressLogger, logger } from './config/Logger.config';
import routes from './routes/index.routes';
import { Quest } from './entities/quest.entity';
import { User } from './entities/user.entity';

//import routes from './Routes/index.routes';

dotenv.config();
createConnection({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: true,
  entities: [Quest, User ]
})
  .then(async () => {
    const app: Application = express();
    app.use(expressLogger);
    app.use(express.json());
    app.use('/v1', routes);
    app.get('/', (req: Request, res: Response) => {
      res.send({ message: `Welcome to the matrix boys` });
    });

    app.listen(process.env.PORT || 5000, () => {
      logger.info(`🚀 - app running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    logger.error(`${error}`);
  });