const axios = require("axios");

async function askGemini(prompt) {
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) throw new Error("❌ GEMINI_API_KEY não configurada no .env");

  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  const response = await axios.post(url, {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ]
  });

  return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ Não consegui gerar resposta.";
}

module.exports = { askGemini };
