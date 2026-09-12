const fs = require('fs');
let code = fs.readFileSync('src/components/MemoryVaultViewer.tsx', 'utf8');

if (!code.includes('StudyAnalyzerPanel')) {
  code = code.replace(
    "import { ObsidianPanel } from './ObsidianPanel';",
    "import { ObsidianPanel } from './ObsidianPanel';\nimport { StudyAnalyzerPanel } from './StudyAnalyzerPanel';"
  );
}

// Update State type
code = code.replace(
  "useState<'files' | 'student-nus' | 'workspace' | 'obsidian'>",
  "useState<'files' | 'student-nus' | 'workspace' | 'obsidian' | 'study-lab'>"
);

// Add Tab Button
const obsidianTabBtnRegex = /<button\s*onClick=\{\(\) => setActiveTab\('obsidian'\)\}[^>]*>\s*Obsidian \(Local\)\s*<\/button>/s;
const newBtns = `
          <button
            onClick={() => setActiveTab('obsidian')}
            className={\`px-3 py-1 transition-all \${
              activeTab === 'obsidian' ? 'bg-[#a855f7] text-black' : 'text-[#666] hover:text-[#a855f7]'
            }\`}
          >
            Obsidian (Local)
          </button>
          <button
            onClick={() => setActiveTab('study-lab')}
            className={\`px-3 py-1 transition-all \${
              activeTab === 'study-lab' ? 'bg-[#f59e0b] text-black' : 'text-[#666] hover:text-[#f59e0b]'
            }\`}
          >
            Study Lab
          </button>
`;
code = code.replace(obsidianTabBtnRegex, newBtns);

// Add Tab Content
const obsidianTabContentRegex = /\{\/\*\s*Tab: Obsidian\s*\*\/\}\s*\{activeTab === 'obsidian' && <ObsidianPanel \/>\}/s;
const newContent = `
      {/* Tab: Obsidian */}
      {activeTab === 'obsidian' && <ObsidianPanel />}

      {/* Tab: Study Lab */}
      {activeTab === 'study-lab' && <StudyAnalyzerPanel />}
`;
code = code.replace(obsidianTabContentRegex, newContent);

fs.writeFileSync('src/components/MemoryVaultViewer.tsx', code);
