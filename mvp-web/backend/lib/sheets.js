const { google } = require('googleapis');

function getSheetsClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (!email || !key) {
    throw new Error('Credenciais do Google não configuradas corretamente.');
  }
  const auth = new google.auth.JWT(
    email,
    null,
    key,
    ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive']
  );
  return google.sheets({ version: 'v4', auth });
}

async function listModelos() {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const range = 'Modelos!A2:F';
  const res = await sheets.spreadsheets.values.get({ spreadsheetId, range });
  const rows = res.data.values || [];
  return rows.map((r, i) => ({
    id: r[0] || String(i + 1),
    marca: r[1] || '',
    modelo: r[2] || '',
    ano: r[3] || '',
    pecas: (r[4] || '').split(',').map(s => s.trim()).filter(Boolean),
    criado_em: r[5] || ''
  }));
}

async function addModelo({ marca, modelo, ano, pecas }) {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const criado = new Date().toISOString();
  const id = Date.now().toString(); // simples e único o suficiente p/ MVP
  const linha = [
    id,
    String(marca || ''),
    String(modelo || ''),
    String(ano || ''),
    Array.isArray(pecas) ? pecas.join(', ') : String(pecas || ''),
    criado
  ];
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Modelos!A2:F',
    valueInputOption: 'RAW',
    requestBody: { values: [linha] }
  });
  return { id, criado_em: criado };
}

module.exports = { listModelos, addModelo };
