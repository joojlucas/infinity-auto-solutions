import React, { useEffect, useState } from "react";
import { listModelos, addModelo, sendMessage } from "./api";
import "./styles.css";

function App() {
  const [status, setStatus] = useState("Carregando...");
  const [modelos, setModelos] = useState([]);
  const [form, setForm] = useState({ marca: "", modelo: "", ano: "", pecas: "" });
  const [chatInput, setChatInput] = useState("");
  const [chatLog, setChatLog] = useState([]);

  // Testa conexão
  useEffect(() => {
    fetch("http://localhost:3001/health")
      .then((res) => res.json())
      .then((data) => setStatus(data.ok ? "✅ Backend está vivo!" : "❌ Backend respondeu errado"))
      .catch(() => setStatus("❌ Erro ao conectar no backend"));

    // Carrega modelos
    listModelos().then(setModelos).catch(() => setModelos([]));
  }, []);

  // Cadastro de modelo
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addModelo(form);
    setForm({ marca: "", modelo: "", ano: "", pecas: "" });
    const novos = await listModelos();
    setModelos(novos);
  };

  // Enviar chat
  const handleChat = async (e) => {
    e.preventDefault();
    if (!chatInput) return;
    setChatLog([...chatLog, { from: "user", text: chatInput }]);
    const reply = await sendMessage(chatInput);
    setChatLog((prev) => [...prev, { from: "bot", text: reply }]);
    setChatInput("");
  };

  return (
    <div className="container">
      <h1>MVP Consulta Veículos</h1>
      <p>Status do backend: {status}</p>

      {/* Formulário */}
      <div className="card">
        <h2>Cadastrar Modelo</h2>
        <form onSubmit={handleSubmit}>
          <input placeholder="Marca" value={form.marca} onChange={(e) => setForm({ ...form, marca: e.target.value })} />
          <input placeholder="Modelo" value={form.modelo} onChange={(e) => setForm({ ...form, modelo: e.target.value })} />
          <input placeholder="Ano" value={form.ano} onChange={(e) => setForm({ ...form, ano: e.target.value })} />
          <input placeholder="Peças" value={form.pecas} onChange={(e) => setForm({ ...form, pecas: e.target.value })} />
          <button type="submit">Cadastrar</button>
        </form>
      </div>

      {/* Lista */}
      <div className="card">
        <h2>Modelos Cadastrados</h2>
        <ul>
          {modelos.map((m, i) => (
            <li key={i}>
              {m.marca} {m.modelo} ({m.ano}) → {m.pecas.join(", ")}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat */}
      <div className="card">
        <h2>Chatbot</h2>
        <div className="chat-box">
          {chatLog.map((msg, i) => (
            <div key={i} className={msg.from}>
              <b>{msg.from === "user" ? "Você" : "Bot"}:</b> {msg.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleChat}>
          <input
            placeholder="Pergunte sobre peças ou modelos..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
