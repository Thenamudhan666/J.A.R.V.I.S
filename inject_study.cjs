const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const studyRoute = `
// API: Study Analyzer
app.post("/api/gemini/study-analysis", async (req, res) => {
  const { filename, content } = req.body;
  const ai = getGemini();
  if (!ai) return res.status(500).json({ error: "Gemini API key missing" });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: \`Analyze this study material. Filename: \${filename}\\n\\nContent:\\n\${content.substring(0, 30000)}\`,
      config: {
        systemInstruction: "You are JARVIS, a highly advanced Socratic tutor. Analyze the provided text and output a JSON object containing a study guide.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "A concise summary of the core topic." },
            keyConcepts: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-5 crucial vocabulary terms or concepts explained." },
            socraticQuestions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 probing Socratic questions designed to test the user's deep understanding." }
          },
          required: ["summary", "keyConcepts", "socraticQuestions"]
        }
      }
    });
    
    let text = response.text || "{}";
    // Sometimes the model might wrap in markdown backticks
    if (text.startsWith("\`\`\`json")) {
        text = text.replace(/\`\`\`json/g, "").replace(/\`\`\`/g, "").trim();
    }
    const parsed = JSON.parse(text);
    res.json(parsed);
  } catch (err) {
    console.error("Study Analysis Error:", err);
    res.status(500).json({ error: typeof err === 'string' ? err : (err?.message || 'Failed to analyze document') });
  }
});

`;

code = code.replace('app.get("/api/health"', studyRoute + 'app.get("/api/health"');
fs.writeFileSync('server.ts', code);
