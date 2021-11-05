import express, { NextFunction, Request, Response } from 'express';
import { urlencoded, json } from 'body-parser';
import { RegisterRoutes } from './generated/routes/routes';
import swaggerDocument from './generated/spec/swagger.json';
import swaggerUi from 'swagger-ui-express';
import { extractErrorDTO } from './app/errors/errors';

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

RegisterRoutes(app);

app.use(function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const dto = extractErrorDTO(err);
  return res.status(dto.status).json(dto);
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at port ' + port);
});
server.on('error', console.error);
