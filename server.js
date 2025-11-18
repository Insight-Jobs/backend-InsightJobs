
const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();
const userRoutes = require('./src/routes/userRoutes');
const app = express();

// Configurações
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cors());


app.use(express.static(path.join(__dirname, '.')));

// Usar as rotas que criamos
app.use('/', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});