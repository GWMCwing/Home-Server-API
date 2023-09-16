import type { Request, Response } from 'express';
import { Router } from 'express';
import { localOnly } from '../../middleware/localOnly';
import rateLimit from 'express-rate-limit';
import { createUser } from './createUser';
import { requestNonce } from './getNonce';

const maxRequests = 10;
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: maxRequests,
  message: 'Too many requests from this IP, please try again in a minute',
  standardHeaders: true,
  legacyHeaders: false,
  //
  skip: (req: Request, res: Response) => {
    // allow local requests
    const remote = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const isLocal = remote === '::1' || remote === '::ffff:127.0.0.1';
    return isLocal;
  },
});

const router = Router({
  caseSensitive: true,
});
//
router.post('/createUser', localOnly, createUser);
//
router.get('/verifyEmail', limiter, (req, res, next) => {
  // TODO:
  res.status(500);
  next();
});
router.get('/nonce/get', localOnly, requestNonce);

export { router as authRouter };
