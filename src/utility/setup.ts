import type { Application, Response } from 'express';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
//
function setUpExpress(app: Application) {
  app.enable('trust proxy');
  app.disable('x-powered-by');
  app.use(morgan('combined'));
  app.use(
    morgan('dev', {
      skip: (req, res) => {
        return res.statusCode < 400;
      },
    })
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
}

export { setUpExpress };
