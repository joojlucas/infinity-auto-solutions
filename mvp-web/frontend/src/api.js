import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' }
});

export const sendMessage = async (message) => {
  const { data } = await API.post('/api/chat', { message });
  return data.reply;
};

export const listModelos = async () => {
  const { data } = await API.get('/api/modelos');
  return data.data || [];
};

export const addModelo = async (payload) => {
  const { data } = await API.post('/api/modelos', payload);
  return data;
};
