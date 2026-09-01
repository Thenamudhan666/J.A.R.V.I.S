const fs = require('fs');
let code = fs.readFileSync('src/components/MemoryVaultViewer.tsx', 'utf8');

if (!code.includes('WorkspaceIntegrationPanel')) {
  code = code.replace(
    "import { VaultFile } from '../types';", 
    "import { VaultFile } from '../types';\nimport { WorkspaceIntegrationPanel } from './WorkspaceIntegrationPanel';"
  );
}

code = code.replace(
  "const [activeTab, setActiveTab] = useState<'files' | 'student-nus'>('files');",
  "const [activeTab, setActiveTab] = useState<'files' | 'student-nus' | 'workspace'>('workspace');"
);

const tabSwitcher = `
          <button
            onClick={() => setActiveTab('student-nus')}
            className={\`px-3 py-1 transition-all \${
              activeTab === 'student-nus' ? 'bg-[#00f0ff] text-black' : 'text-[#666] hover:text-[#00f0ff]'
            }\`}
          >
            nūs Student Core
          </button>
          <button
            onClick={() => setActiveTab('workspace')}
            className={\`px-3 py-1 transition-all \${
              activeTab === 'workspace' ? 'bg-[#00f0ff] text-black' : 'text-[#666] hover:text-[#00f0ff]'
            }\`}
          >
            Workspace
          </button>
`;
code = code.replace(/<button\s*onClick=\{\(\) => setActiveTab\('student-nus'\)\}[^>]*>\s*nūs Student Core\s*<\/button>/s, tabSwitcher);

const workspaceTabContent = `
      {/* Tab: Workspace */}
      {activeTab === 'workspace' && <WorkspaceIntegrationPanel />}
    </div>
  );
`;
code = code.replace(/<\/div>\s*\);\s*\};\s*$/s, workspaceTabContent + '};\n');

fs.writeFileSync('src/components/MemoryVaultViewer.tsx', code);
