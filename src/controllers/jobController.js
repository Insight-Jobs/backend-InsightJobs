// src/controllers/jobController.js
const { PythonShell } = require('python-shell');
const path = require('path');

const buscarVagas = async (req, res) => {
    try {
        const { termo_busca, termo_filtro } = req.query;

        if (!termo_busca) {
            return res.status(400).json({ 
                erro: "O parâmetro 'termo_busca' é obrigatório" 
            });
        }

        const options = {
            mode: 'json',
            pythonPath: 'python', // ou 'python3' no Linux/Mac
            pythonOptions: ['-u'],
            scriptPath: path.join(__dirname, '../../'),
            args: [termo_busca, termo_filtro || '']
        };

        // Executa o script Python
        const results = await new Promise((resolve, reject) => {
            PythonShell.run('futuro_do_trabalho_api.py', options, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });

        res.json({
            sucesso: true,
            dados: results[0] // O script Python vai retornar JSON
        });

    } catch (error) {
        console.error('Erro ao buscar vagas:', error);
        res.status(500).json({ 
            erro: "Erro ao buscar vagas: " + error.message 
        });
    }
};

module.exports = {
    buscarVagas
};