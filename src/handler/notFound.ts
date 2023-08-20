import type { NextFunction, Request, Response } from 'express';

function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  return res.status(404).end();
}

export { notFoundHandler };
