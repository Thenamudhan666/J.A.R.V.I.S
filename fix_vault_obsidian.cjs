const fs = require('fs');
let code = fs.readFileSync('src/components/MemoryVaultViewer.tsx', 'utf8');

if (!code.includes('ObsidianPanel')) {
  code = code.replace(
    "import { WorkspaceIntegrationPanel } from './WorkspaceIntegrationPanel';", 
    "import { WorkspaceIntegrationPanel } from './WorkspaceIntegrationPanel';\nimport { ObsidianPanel } from './ObsidianPanel';"
  );
}

code = code.replace(
  "const [activeTab, setActiveTab] = useState<'files' | 'student-nus' | 'workspace'>('workspace');",
  "const [activeTab, setActiveTab] = useState<'files' | 'student-nus' | 'workspace' | 'obsidian'>('obsidian');"
);

const tabSwitcher = `
          <button
            onClick={() => setActiveTab('workspace')}
            className={\`px-3 py-1 transition-all \${
              activeTab === 'workspace' ? 'bg-[#00f0ff] text-black' : 'text-[#666] hover:text-[#00f0ff]'
            }\`}
          >
            Workspace
          </button>
          <button
            onClick={() => setActiveTab('obsidian')}
            className={\`px-3 py-1 transition-all \${
              activeTab === 'obsidian' ? 'bg-[#a855f7] text-black' : 'text-[#666] hover:text-[#a855f7]'
            }\`}
          >
            Obsidian (Local)
          </button>
`;
code = code.replace(/<button\s*onClick=\{\(\) => setActiveTab\('workspace'\)\}[^>]*>\s*Workspace\s*<\/button>/s, tabSwitcher);

const obsidianTabContent = `
      {/* Tab: Obsidian */}
      {activeTab === 'obsidian' && <ObsidianPanel />}
    </div>
  );
`;
code = code.replace(/<\/div>\s*\);\s*\};\s*$/s, obsidianTabContent + '};\n');

fs.writeFileSync('src/components/MemoryVaultViewer.tsx', code);
