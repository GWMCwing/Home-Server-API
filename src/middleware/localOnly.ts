import type { NextFunction, Request, Response } from 'express';

function localOnly(req: Request, res: Response, next: NextFunction) {
  const remote = req.socket.remoteAddress;
  const isLocal = remote === '::1' || remote === '::ffff:127.0.0.1';
  if (!isLocal) {
    return res.status(404).end();
  }
  return next();
}

export { localOnly };
