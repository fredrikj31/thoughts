export default {
  "app/**/*": () => [
    "pnpm run app:format",
    "pnpm run app:lint",
    "pnpm run app:build:check",
  ],
  "api/**/*": () => [
    "pnpm run api:format",
    "pnpm run api:lint",
    "pnpm run api:build:check",
  ],
};
