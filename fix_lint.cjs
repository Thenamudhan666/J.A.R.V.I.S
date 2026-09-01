const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// The React.FC helps define the key prop natively
code = code.replace(
  /const AnimatedMessage = \({ msg }: \{ msg: ChatMessage \}\) => \{/,
  'const AnimatedMessage: React.FC<{ msg: ChatMessage }> = ({ msg }) => {'
);

fs.writeFileSync('src/App.tsx', code);
