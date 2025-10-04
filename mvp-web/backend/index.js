require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { askGemini } = require('./lib/gemini');
const { listModelos, addModelo } = require('./lib/sheets');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:****'
}));

// ---- Rotas básicas
app.get('/', (_req, res) => {
  res.send('✅ Backend do MVP rodando! Use /health para verificar status.');
});

app.get('/health', (_req, res) => res.json({ ok: true }));

// ---- Chatbot (Gemini)
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message) return res.status(400).json({ error: 'message é obrigatório' });

    // Puxa alguns modelos cadastrados para dar contexto ao Gemini
    const modelos = await listModelos().catch(() => []);
    const contexto = modelos.slice(0, 8).map(m =>
      `- ${m.marca} ${m.modelo} (${m.ano}) | peças: ${Array.isArray(m.pecas) ? m.pecas.join(', ') : m.pecas}`
    ).join('\n');

    // Prompt direto pro Gemini
    const prompt = `
Você é um assistente de peças automotivas.
Quando perguntarem sobre modelos/peças, use o contexto (quando ajudar).

Contexto (primeiros modelos cadastrados):
${contexto || '(sem dados ainda)'}

Pergunta do usuário: ${message}
Responda de forma direta e útil.
    `.trim();

    // Chamada ao Gemini
    const reply = await askGemini(prompt);

    res.json({ reply });
  } catch (err) {
    console.error('Erro no /api/chat:', err.response?.data || err.message);
    res.status(500).json({ error: 'Falha no chatbot' });
  }
});

// ---- Modelos (Google Sheets)
app.get('/api/modelos', async (_req, res) => {
  try {
    const data = await listModelos();
    res.json({ data });
  } catch (err) {
    console.error('Erro no /api/modelos GET:', err);
    res.status(500).json({ error: 'Falha ao listar modelos' });
  }
});

app.post('/api/modelos', async (req, res) => {
  try {
    const { marca, modelo, ano, pecas } = req.body || {};
    if (!marca || !modelo) {
      return res.status(400).json({ error: 'marca e modelo são obrigatórios' });
    }

    const created = await addModelo({ marca, modelo, ano, pecas });
    res.status(201).json({ ok: true, ...created });
  } catch (err) {
    console.error('Erro no /api/modelos POST:', err);
    res.status(500).json({ error: 'Falha ao adicionar modelo' });
  }
});

// ---- Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Backend rodando em http://localhost:${PORT}`));
