import type { Request, Response } from 'express';
import { Router } from 'express';
import { localOnly } from '../../middleware/localOnly';
import rateLimit from 'express-rate-limit';
import { requestVerificationEmail } from './requestVerificationEmail';

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
    const remote = req.socket.remoteAddress;
    const isLocal = remote === '::1' || remote === '::ffff:127.0.0.1';
    return isLocal;
  },
});

const router = Router({
  caseSensitive: true,
});
//
router.post('/requestVerificationEmail', localOnly, requestVerificationEmail);
//
router.get('/verifyEmail', limiter, (req, res, next) => {
  // TODO:
  res.status(500);
  next();
});

export { router as authRouter };
