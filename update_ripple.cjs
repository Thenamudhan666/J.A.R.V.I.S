const fs = require('fs');
let code = fs.readFileSync('src/components/HolographicOrb.tsx', 'utf8');

// Replace default displacement
code = code.replace(/let displacementFactor = 0\.15 \+ currentAmp \* 0\.4;/, 'let displacementFactor = 0.0;');

// Replace listening
code = code.replace(/displacementFactor = 0\.2 \+ currentAmp \* 0\.6;/, 'displacementFactor = 0.0;');

// Replace debating
code = code.replace(/displacementFactor = 0\.35;/, 'displacementFactor = 0.0;');

// Replace reasoning
code = code.replace(/displacementFactor = 0\.25;/, 'displacementFactor = 0.0;');

// Replace learning
code = code.replace(/displacementFactor = 0\.3;/, 'displacementFactor = 0.0;');

// Speaking was: displacementFactor = 0.3 + currentAmp * 0.7;
// Leave speaking as is or make it more prominent? Let's leave it as is or slightly higher.

fs.writeFileSync('src/components/HolographicOrb.tsx', code);
