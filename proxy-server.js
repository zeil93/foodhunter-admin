const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Включаем CORS для всех запросов
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Прокси для API FoodHunter
app.use('/api', createProxyMiddleware({
  target: 'https://xromconsulting.com/foodhunter',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api'
  },
  onProxyReq: (proxyReq, req, res) => {
    // Добавляем токен авторизации ко всем запросам
    proxyReq.setHeader('Authorization', 'Bearer 2oQia6qIlr4i34d9yHRSAliGFWBGvSFo9xCBotmL2dGOOooFZP4ldMSSbfACnrhl');
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Proxy error', details: err.message });
  }
}));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Proxy server running on port ${PORT}`);
  console.log(`API available at: http://localhost:${PORT}/api`);
});

