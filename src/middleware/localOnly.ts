import type { NextFunction, Request, Response } from 'express';
import { env } from '../utility/env';

function localOnly(req: Request, res: Response, next: NextFunction) {
  const remote = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const isLocal = remote === '::1' || remote === '::ffff:127.0.0.1';
  const hasSecret = req.headers['x-secret'] === env.SECRET;
  if (!isLocal && !hasSecret) {
    return res.status(404).end();
  }
  return next();
}

export { localOnly };
