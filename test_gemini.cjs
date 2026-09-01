const { GoogleGenAI } = require("@google/genai");
async function test() {
  const ai = new GoogleGenAI({ apiKey: "AIzaSyB5NOqCbV4te3FQ7DM8wE_DmuRzT2fWw4k" });
  try {
    await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: "Hello"
    });
  } catch (e) {
    console.log("Error keys:", Object.keys(e));
    console.log("Error message:", e.message);
  }
}
test();
