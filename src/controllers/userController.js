const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth'); 

// --- CADASTRAR ---
const registerUser = async (req, res) => {
    try {
        const dados = req.body;

        if(!dados.senha) return res.status(400).json({erro: "Senha é obrigatória"});

        const tratarArray = (campo) => {
            if (Array.isArray(campo)) return campo;
            if (typeof campo === 'string') return campo.split(',').map(s => s.trim());
            return [];
        };

        const senhaHash = await bcrypt.hash(dados.senha, 10);

        const novoPerfil = {
            id: Number(dados.idProprio) || Date.now(),
            email: dados.email,
            senha: senhaHash, 
            nome: dados.nome,
            foto: dados.foto,
            cargo: dados.cargo,
            resumo: dados.resumo,
            localizacao: dados.localizacao,
            area: dados.area,
            habilidadesTecnicas: tratarArray(dados.habilidadesTecnicas),
            softSkills: tratarArray(dados.softSkills),
            areaInteresses: tratarArray(dados.areaInteresses),
            experiencias: dados.experiencias || [],
            formacao: dados.formacao || []
        };

        await userModel.createUser(novoPerfil);

        novoPerfil.senha = undefined;

        res.status(201).json({ 
            mensagem: "Usuário criado!",
            usuario: novoPerfil 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro no servidor: " + error.message });
    }
};

// --- LOGIN ---
const loginUser = async (req, res) => {
    try {
        const { email, senha } = req.body;
        
        const users = await userModel.getAllUsers();
        const user = users.find(u => u.email === email);

        if (!user) {
            return res.status(400).json({ erro: 'Usuário não encontrado' });
        }

        const senhaCorreta = await bcrypt.compare(senha, user.senha);
        if (!senhaCorreta) {
            return res.status(400).json({ erro: 'Senha inválida' });
        }

        const token = jwt.sign(
            { id: user.id }, 
            authConfig.secret,   
            { expiresIn: authConfig.expiresIn }
        );

        res.json({ 
            mensagem: "Logado com sucesso!",
            token: token 
        });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser
};