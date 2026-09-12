const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');
code = code.replace(/catch \((.*?)\) \{/g, (match, p1) => {
  return `catch (error: any) {`;
});
code = code.replace(/console\.error\("(.*?)", err\);/g, 'console.error("$1", error);');
code = code.replace(/console\.error\("Study Analysis Error:", err\);/g, 'console.error("Study Analysis Error:", error);');
// and for line 139 where 'error' wasn't defined. Wait, what is line 139?
fs.writeFileSync('server.ts', code);
