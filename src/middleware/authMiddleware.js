// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth'); // <--- OBRIGATÓRIO: Importar a config

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ erro: 'Token não fornecido.' });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).json({ erro: 'Erro no Token' });
    }

    const [ scheme, token ] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ erro: 'Token mal formatado' });
    }
    

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            console.log("Erro na verificação:", err.message); // Ajuda a entender o erro
            return res.status(401).json({ erro: 'Token inválido ou expirado.' });
        }

        req.userId = decoded.id;
        return next();
    });
};