const fs = require("fs");
const path = require("path");
const { parseEnv } = require("./parse");

// List of important system environment variables we should NOT override
const PROTECTED_ENV_VARS = new Set([
  "PATH",
  "HOME",
  "USER",
  "SHELL",
  "LOGNAME",
  "TEMP",
  "TMPDIR",
  "PWD",
  "TERM",
  "NODE_ENV", // Keep NODE_ENV unchanged unless explicitly overridden
]);

function load(options = {}) {
  const filePath = options.path || ".env";
  const override = options.override || false;
  const encoding = options.encoding || "utf-8";

  const envPath = path.resolve(process.cwd(), filePath);

  if (!fs.existsSync(envPath)) {
    return { error: new Error(`${envPath} not found`), parsed: {} };
  }

  if (!envPath.startsWith(process.cwd() + path.sep)) {
    return {
      error: new Error("Access to this file is restricted."),
      parsed: {},
    };
  }

  let content = fs.readFileSync(envPath, encoding);
  content = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n"); // Normalize line endings

  const env = parseEnv(content);

  Object.keys(env).forEach((key) => {
    // Prevent overwriting critical system environment variables
    if (PROTECTED_ENV_VARS.has(key) && !override) {
      return;
    }
    if (!process.env[key] || override) {
      process.env[key] = env[key];
    }
  });

  return { parsed: env };
}

module.exports = { load };
