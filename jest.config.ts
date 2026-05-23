import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const customConfig: Config = {
  setupFiles: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["<rootDir>/tests/**/*.test.{ts,tsx}"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/app/**/page.tsx",
    "!src/app/**/layout.tsx",
  ],
  coverageThreshold: {
    global: { branches: 70, functions: 70, lines: 70, statements: 70 },
  },
};

// Wrap next/jest so we can override transformIgnorePatterns to allow jose (ESM-only) through SWC.
const buildConfig = async () => {
  const finalConfig = await createJestConfig(customConfig)();
  return {
    ...finalConfig,
    transformIgnorePatterns: [
      "/node_modules/(?!(jose|@panva)/)",
      "^.+\\.module\\.(css|sass|scss)$",
    ],
  };
};

export default buildConfig;
