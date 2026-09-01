const fs = require('fs');
let code = fs.readFileSync('src/components/HolographicOrb.tsx', 'utf8');

// Replace interrupted
code = code.replace(/displacementFactor = 0\.6;/, 'displacementFactor = 0.0;');

fs.writeFileSync('src/components/HolographicOrb.tsx', code);
