const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// The regex replace resulted in something like: typeof "Failed..." === 'string'
// Let's replace the whole catch block or just fix the error json line
code = code.replace(/res\.status\(500\)\.json\(\{ error: typeof "(.*?)" === 'string' \? "(.*?)" : \("(.*?)"\?\.message \|\| 'Internal Server Error'\) \}\);/g, "res.status(500).json({ error: \"$1\" });");

fs.writeFileSync('server.ts', code);
