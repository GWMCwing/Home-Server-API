import type { ObjectSchema, Output } from 'valibot';

export type KeyArray<T extends Record<any, any>> = (keyof T)[];

export type ErrorOrResult<T, N extends string = 'result', E extends any = true> = ({ [K in N]: T } & { error?: never }) | ({ [K in N]?: never } & { error: E });

export type IfEquals<T, U, Y = T, N = unknown> = (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U ? 1 : 2 ? Y : N;

export type ConstraintRequestSchema<T extends ObjectSchema<any, any>, U> = IfEquals<Output<T>, U>;
