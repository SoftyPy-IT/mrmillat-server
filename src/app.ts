import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import cookieParser from 'cookie-parser';
import config from './app/config';

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      const allowedOrigins = [
        config.CORS_ORIGIN_ADMIN,
        config.CORS_ORIGIN_CLIENT,
       "http://localhost:3000",
       "http://localhost:3001"
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400,
  }),
);

app.use(cookieParser());
app.use('/api/v1', router);
app.use((req, res, next) => {
  const userAgent = req.headers['user-agent'];
  if (userAgent && userAgent.includes('facebookexternalhit')) {
    console.log('Facebook crawler accessed:', req.originalUrl);
  }
  next();
});
app.use(globalErrorHandler);
app.use(notFound);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to the API' });
});

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP' });
});

export default app;
