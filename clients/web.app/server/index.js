const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));


const port = process.env.SERVER_WEB_APP || 5000;
const apiUrl = process.env.VITE_URL_API || 'http://localhost:3000';

app.get('/config.js', (req, res) => {
  res.type('application/javascript');
  res.send(`window.API_CONFIG = { apiUrl: "${apiUrl}" };`);
});

// Rota principal
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});