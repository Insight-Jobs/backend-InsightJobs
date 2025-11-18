require ('dotenv').config()

const PORT = 3000

const express = require("express")
const mongoose = require("mongoose");
const app = express();

app.use(express.json())

//Conenctando banco de dados
mongoose.connect(process.env.MONGODB_URI)
    .then(() =>console.log('Conectado ao banco de dados'))
    .catch(err => console.error('Erro ao conectar ao banco de dados '))

// ------------------------- ROTAS ---------------------------


app.get("/" , (req, res) =>{
    res.send("API de Autenticacao rodando!! ")
})

app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`);
})