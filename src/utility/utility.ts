import type { Request } from 'express';
import { type ObjectSchema, type Output, parse } from 'valibot';
import { ConstraintRequestSchema } from '../types/utility';

function requireBody<T, S extends ObjectSchema<any, any>>(
  targetType: T,
  req: Request,
  schema: S
):
  | {
      success: true;
      result: ConstraintRequestSchema<S, T>;
    }
  | {
      success: false;
      result: unknown;
    } {
  try {
    parse(schema, req.body);
  } catch (error) {
    return { success: false, result: error };
  }
  return { success: true, result: req.body as ConstraintRequestSchema<typeof schema, T> };
}

export { requireBody };
