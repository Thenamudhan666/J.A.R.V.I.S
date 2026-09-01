const { GoogleGenAI } = require("@google/genai");
async function test() {
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyB5NOqCbV4te3FQ7DM8wE_DmuRzT2fWw4k",
    httpOptions: { headers: { "User-Agent": "aistudio-build" } }
  });
  try {
    await ai.models.generateContent({ model: "gemini-3.7-flash", contents: "Hello" });
  } catch(e) {
    console.log(e.message);
  }
}
test();
