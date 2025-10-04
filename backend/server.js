import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const API_TOKEN = process.env.API_TOKEN;
const API_BASE = "https://wdapi2.com.br/consulta";

// Base de peças para exemplo MVP
const pecasDB = [
  { chassi: "9BWZZZ377VT004251", codigo: "FILTRO123", nome: "Filtro de óleo", categoria: "Motor", preco: 25.0 },
  { chassi: "9BWZZZ377VT004251", codigo: "PASTILHA456", nome: "Pastilha de freio", categoria: "Freios", preco: 80.0 },
  { chassi: "9BWZZZ377VT004251", codigo: "OLEO789", nome: "Óleo Motor 5W30", categoria: "Motor", preco: 120.0 }
];

// Consulta veículo pela placa
app.get("/api/placa/:placa", async (req, res) => {
  try {
    let placa = req.params.placa.replace(/\W/g, "").toUpperCase();
    const url = `${API_BASE}/${placa}/${API_TOKEN}`;
    const response = await fetch(url, { headers: { Accept: "application/json" } });
    const data = await response.json();

    const chassi = data.chassi || null;

    res.json({
      placa,
      marca: data.MARCA || null,
      modelo: data.MODELO || null,
      cor: data.COR || null,
      ano_fabricacao: data.ano || null,
      ano_modelo: data.anoModelo || null,
      chassi
    });
  } catch (err) {
    res.status(500).json({ error: "Erro interno", detail: err.message });
  }
});

// Busca peças pelo chassi
app.get('/api/pecas/:chassi', (req, res) => {
  const chassi = req.params.chassi;
  const pecas = pecasDB.filter(p => p.chassi === chassi);
  res.json(pecas);
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
