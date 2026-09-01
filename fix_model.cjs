const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// Replace gemini-2.0-flash with gemini-3.6-flash
code = code.replace(/gemini-2.0-flash/g, 'gemini-3.6-flash');

fs.writeFileSync('server.ts', code);
