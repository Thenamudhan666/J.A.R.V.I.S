const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// Replace gemini-3.6-flash with gemini-2.5-flash since 3.6 doesn't exist
code = code.replace(/gemini-3\.6-flash/g, 'gemini-2.5-flash');
code = code.replace(/gemini-3\.7-flash/g, 'gemini-2.5-flash'); // just to be safe
// Replace live preview model
code = code.replace(/gemini-3\.1-flash-live-preview/g, 'gemini-2.0-flash-exp');

// Fix error handling to prevent circular JSON issues
code = code.replace(
  /res\.status\(500\)\.json\(\{ error: (.*?) \}\);/g,
  "res.status(500).json({ error: typeof $1 === 'string' ? $1 : ($1?.message || 'Internal Server Error') });"
);

fs.writeFileSync('server.ts', code);
