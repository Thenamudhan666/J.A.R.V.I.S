const fs = require('fs');
let code = fs.readFileSync('src/components/HolographicOrb.tsx', 'utf8');

// Increase min height of the wrapper
code = code.replace(/min-h-\[360px\]/, 'min-h-[480px]');

fs.writeFileSync('src/components/HolographicOrb.tsx', code);
