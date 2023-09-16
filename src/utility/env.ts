const RequiredEnv = ['PORT', 'SECRET'];

const env: Record<(typeof RequiredEnv)[number], string> = {};

{
  const missing: string[] = [];

  for (const key of RequiredEnv) {
    const envValue = process.env[key];
    if (envValue === undefined) missing.push(key);
    else env[key] = envValue;
  }
  if (missing.length > 0) throw new Error(`Missing env: ${missing.join(', ')}`);
}

export { env };
