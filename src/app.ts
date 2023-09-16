require('dotenv').config();
import express from 'express';
import { authRouter } from './router/auth/_router';
import { notFoundHandler } from './handler/notFound';
import { internalErrorHandler } from './handler/internalError';
import { setUpExpress } from './utility/setup';
import { env } from './utility/env';
import listEndpoints from 'express-list-endpoints';
//
const app = express();

setUpExpress(app);
// morgan and helmet and cookie-parser
app.use('/auth', authRouter);

//
app.use(notFoundHandler);
app.use(internalErrorHandler);
//
console.log(listEndpoints(app));
//
const port = env.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
