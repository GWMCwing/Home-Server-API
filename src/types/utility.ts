export type KeyArray<T extends Record<any, any>> = (keyof T)[];

export type ErrorOrResult<T, N extends string = 'result', E extends any = true> = ({ [K in N]: T } & { error?: never }) | ({ [K in N]?: never } & { error: E });
