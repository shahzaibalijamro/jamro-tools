export type JamroTestMode = "fixtures" | null;
type JamroTestEnvironment = {
  NEXT_PUBLIC_JAMRO_TEST_MODE?: string;
  NODE_ENV?: string;
  VERCEL_ENV?: string;
};

export function getJamroTestMode(
  env: JamroTestEnvironment = process.env as JamroTestEnvironment,
): JamroTestMode {
  if (env.VERCEL_ENV === "production" || env.NODE_ENV === "production") return null;
  return env.NEXT_PUBLIC_JAMRO_TEST_MODE === "fixtures" ? "fixtures" : null;
}

export function isFixtureMode(): boolean {
  return getJamroTestMode({
    NEXT_PUBLIC_JAMRO_TEST_MODE: process.env.NEXT_PUBLIC_JAMRO_TEST_MODE,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
  }) === "fixtures";
}
