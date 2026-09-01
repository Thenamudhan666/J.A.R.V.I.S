const fs = require('fs');
let code = fs.readFileSync('src/components/HolographicOrb.tsx', 'utf8');

// Make the background darker to make it pop
code = code.replace(/bg-\[\#000\] border border-\[\#333\]/, 'bg-slate-950/80 border border-slate-800 backdrop-blur-md rounded-2xl shadow-2xl');

// And remove the inline background image grid if it looks messy, or keep it. It's fine.
fs.writeFileSync('src/components/HolographicOrb.tsx', code);
