const express = require('express');
const path = require('path');
const app = express();
const port = 5124;

app.use(express.static(path.join(__dirname, 'dist')));

// Rota principal
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});