import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
export const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application route
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
});

export default app;
