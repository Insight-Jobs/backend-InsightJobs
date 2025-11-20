// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Importa o segurança

router.post('/cadastro', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/usuarios', authMiddleware, (req, res) => {
    
    res.json({ mensagem: "Você acessou uma rota protegida!", area: "Dados Sigilosos" });
});

router.get('/perfil', authMiddleware, userController.getProfile);

module.exports = router;

const jobController = require('../controllers/jobController');

router.get('/vagas/buscar', jobController.buscarVagas);

router.get('/vagas/buscar', authMiddleware, jobController.buscarVagas);
