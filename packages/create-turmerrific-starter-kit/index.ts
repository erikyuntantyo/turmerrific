#!/usr/bin/env node

import { execSync } from "child_process";
import path from "path";
import fs from "fs";

const projectName = process.argv[2];

if (!projectName) {
  console.error("Please specify a project name:");
  console.error("  npx create-turmerrific-starter-kit my-app");
  process.exit(1);
}

const targetDir = path.resolve(process.cwd(), projectName);

if (fs.existsSync(targetDir)) {
  console.error(`Directory "${projectName}" already exists.`);
  process.exit(1);
}

console.log(`Creating ${projectName}...`);

// Download turmerrific template from GitHub (no git history)
execSync(
  `git clone --depth 1 https://github.com/erikyuntantyo/turmerrific.git ${projectName}`,
  { stdio: "inherit" }
);

// Remove .git so the user starts fresh
fs.rmSync(path.join(targetDir, ".git"), { recursive: true, force: true });

// Remove packages directory (monorepo tooling, not needed for starter kit)
fs.rmSync(path.join(targetDir, "packages"), { recursive: true, force: true });

// Update package.json name
const pkgPath = path.join(targetDir, "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
pkg.name = projectName;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

console.log(`
Done! To get started:

  cd ${projectName}
  yarn install
  yarn dev
`);
