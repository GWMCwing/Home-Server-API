require('dotenv').config();
import express from 'express';
import { authRouter } from './router/auth';
import { notFoundHandler } from './handler/notFound';
import { internalErrorHandler } from './handler/internalError';
import { setUpExpress } from './utility/setup';
//
const app = express();
setUpExpress(app);
// morgan and helmet and cookie-parser
app.use('/auth', authRouter);

//
app.use(notFoundHandler);
app.use(internalErrorHandler);
//
const port = process.env.port;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
