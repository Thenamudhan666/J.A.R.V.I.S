const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(/res\.status\(500\)\.json\(\{ error:.*\}\);/g, "res.status(500).json({ error: error.message || 'Internal Server Error' });");

fs.writeFileSync('server.ts', code);
