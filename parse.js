function parseEnv(content) {
  const env = {};

  // Normalize line endings (CRLF → LF)
  content = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  const lines = content.split("\n");

  lines.forEach((line) => {
    line = line.trim();
    if (!line || line.startsWith("#")) return;

    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (!match) return;

    let [, key, value] = match;

    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    if (value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1);
    }

    value = value.replace(/\\=/g, "=");

    env[key] = value;
  });

  return env;
}

module.exports = { parseEnv };
