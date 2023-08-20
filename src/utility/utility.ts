import type { Request } from 'express';
import { ErrorOrResult } from '../types/utility';

function requireBody<R extends Record<T, any>, T extends keyof R = keyof R>(req: Request, requires: T[]): ErrorOrResult<{ [K in T]: R[K] }, 'body'> {
  const body = req.body;
  const requiredBody: Record<T, any> = {} as any;
  for (const require of requires) {
    if (body[require] === undefined) {
      return { error: true };
    }
    requiredBody[require] = body[require];
  }
  return { body: requiredBody };
}

export { requireBody };
