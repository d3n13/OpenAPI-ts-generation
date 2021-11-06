import express, { Router } from 'express';
import { urlencoded, json } from 'body-parser';
import { serve, setup } from 'swagger-ui-express';
import { RegisterRoutes } from './generated/routes/routes';
import swaggerDocument from './generated/spec/swagger.json';
import { errorHandler } from './app/middleware/errorHandler';

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.use('/api-docs', serve, setup(swaggerDocument));

const apiRouter = Router();
RegisterRoutes(apiRouter);

app.use('/api', apiRouter);

app.use(errorHandler);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at port ' + port);
});
server.on('error', console.error);
