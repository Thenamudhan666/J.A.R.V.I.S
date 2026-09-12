const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  /typeof error\.message \|\| (.*?) === 'string' \? error\.message \|\| \1 : \(\1\?\.message \|\| 'Internal Server Error'\)/g,
  "error.message || $1"
);

fs.writeFileSync('server.ts', code);
