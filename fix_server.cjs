const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// Ensure we return clean error messages
code = code.replace(
  /res\.status\(500\)\.json\(\{ error: error\.message \|\| error \}\);/g,
  "res.status(500).json({ error: error.message || 'Internal Server Error' });"
);

fs.writeFileSync('server.ts', code);
