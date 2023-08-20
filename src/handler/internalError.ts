import type { Request, Response, NextFunction } from 'express';

function internalErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  return res.status(500).end();
}

export { internalErrorHandler };
