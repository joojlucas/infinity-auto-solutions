# Infinity Auto Solutions (IAS) - MVP 🚗🔧  

O **Infinity Auto Solutions (IAS)** é um **MVP (Produto Mínimo Viável)** que serve como ponto de partida para a criação de uma **plataforma digital de identificação e compra de peças automotivas originais**, utilizando inteligência artificial para potencializar a experiência do usuário.  

Este MVP já entrega funcionalidades básicas (consulta de modelos, chatbot com IA e integração inicial com banco de dados em Google Sheets), mas foi projetado para evoluir até se tornar uma solução robusta e multicanal que conecte clientes, concessionárias e montadoras.  

---

## 📌 Contexto e Objetivo

A compra de peças automotivas é muitas vezes confusa e arriscada, com grande risco de fraude, falsificações ou aquisição de itens incompatíveis.  

O IAS nasce para resolver esse problema com os seguintes objetivos:  

- Permitir que o cliente identifique **todas as peças originais compatíveis** com seu veículo de forma rápida e confiável.  
- Garantir que apenas peças originais fornecidas por concessionárias e montadoras sejam comercializadas.  
- Reduzir erros de compra por incompatibilidade.  
- Proporcionar uma **experiência segura, prática e inteligente**.  
- Facilitar a integração das concessionárias com potenciais compradores, aumentando sua visibilidade digital.  

---

## ⚙️ Funcionalidades Atuais (MVP)

- **Chatbot Inteligente**: integrado à API do **Google Gemini** para responder perguntas sobre peças compatíveis, usando contexto pré-carregado.  
- **Integração com Google Sheets**: atuando como banco de dados inicial dos modelos e peças cadastrados.  
- **API Backend (Node.js + Express)**:  
  - `POST /api/chat` → envia mensagens para o chatbot.  
  - `GET /api/modelos` → lista modelos cadastrados.  
  - `POST /api/modelos` → adiciona novos modelos com suas peças.  
- **Frontend Web (Vite + React)**: interface simples para consultar modelos e interagir com o chatbot.  

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js**  
- **Express.js**  
- **Google Gemini API (Generative Language API)**  
- **Google Sheets API**  
- **CORS & dotenv** para configuração de ambiente  

### Frontend
- **React (Vite)**  
- **Fetch API** para integração com backend  

### Ferramentas de Apoio
- **Git/GitHub** para versionamento  
- **Google Cloud Console** (para chaves de API)  

---

## 🚀 Como Rodar o Projeto

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/ias-mvp.git
cd ias-mvp/mvp-web
```
### 2. Backend
```bash
cd backend
npm install
cp .env.example .env   # configure sua chave GEMINI_API_KEY e FRONTEND_ORIGIN
npm start
```
### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
## 🔧 Execução

Por padrão:

- **Backend** → [http://localhost:3001](http://localhost:3001)  
- **Frontend** → [http://localhost:3000](http://localhost:3000)  

---

## 📖 Estrutura do Projeto

```text
mvp-web/
│
├── backend/
│   ├── index.js          # Servidor Express
│   ├── lib/
│   │   ├── gemini.js     # Integração com API Gemini
│   │   └── sheets.js     # Integração com Google Sheets
│   ├── .env.example      # Exemplo de configuração de ambiente
│   ├── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx       # App principal (substitui App.js)
│   │   ├── api.js        # Chamadas ao backend
│   │   └── styles.css
│   ├── index.html
│   ├── package.json


---

## 🔮 Próximos Passos & Evolução Planejada

O MVP é apenas a primeira entrega. O roadmap prevê:

- Integração com **base oficial de placas** para identificar veículos diretamente pela placa.  
- **Catálogo dinâmico** de peças originais integrado em tempo real com concessionárias.  
- **Chatbot avançado com RAG** (busca + IA), recomendando peças por modelo ou imagem.  
- **Busca por imagem com IA** (ex: tirar foto da peça e encontrar compatíveis).  
- **Ambiente seguro de compra** direcionando o cliente diretamente às concessionárias parceiras.  
- **Aplicativo Mobile (React Native/Expo)** para maior alcance.  
- **Painel administrativo para concessionárias**: gestão de estoque e preços.  

---

## 📌 Roadmap Resumido

- ✅ **MVP entregue**: consulta de peças via chatbot + cadastro em Google Sheets  
- 🔄 **Curto prazo**: conexão real com APIs de veículos e concessionárias  
- 🧠 **Médio prazo**: IA com busca por imagem + recomendações personalizadas  
- 🌎 **Longo prazo**: expansão para plataforma completa de venda de peças originais  

---

## 👥 Equipe

- **João Lucas Rodrigues** – Gerente de Projeto & Dev  
- **Matheus Diogo da Silva** – Dev Backend  
- **Gabriel Henrique Maciel Martins** – Dev Frontend  

---

## 📜 Licença

Este projeto foi desenvolvido como **MVP acadêmico e experimental**.  
O código pode ser adaptado e expandido para fins de estudo ou desenvolvimento futuro.  
