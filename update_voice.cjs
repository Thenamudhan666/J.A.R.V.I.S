const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(/voiceName: "Charon"/, 'voiceName: "Aoede"');
// Wait, if Aoede is not supported and the comment said Zephyr, let's use Zephyr.
// Let's use Aoede. If it fails, I'll switch to Zephyr.

fs.writeFileSync('server.ts', code);
