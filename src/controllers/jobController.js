// src/controllers/jobController.js
const { PythonShell } = require('python-shell');
const path = require('path');

// MUDE AQUI: Force o comando que funciona no seu Windows
// Opções: 'py', 'python', 'python3'
const PYTHON_CMD = 'py'; // <--- TESTE COM 'py' primeiro, depois 'python' se não funcionar

const buscarVagasTeste = async (req, res) => {
    try {
        const { termo_busca, termo_filtro } = req.query;

        if (!termo_busca) {
            return res.status(400).json({ 
                erro: "O parâmetro 'termo_busca' é obrigatório" 
            });
        }

        const vagasMock = [
            {
                titulo: `Vaga de ${termo_busca}`,
                empresa: "Tech Company",
                local: "São Paulo, SP",
                plataforma: "LinkedIn",
                modalidade: true,
                salario: "R$ 8.000 - R$ 12.000",
                tipo_carga_horaria: "Full-time",
                beneficios: ["Vale transporte", "Vale refeição"],
                crescimento: 8
            },
            {
                titulo: `${termo_busca} Sênior`,
                empresa: "StartUp XYZ",
                local: "Remote",
                plataforma: "Indeed",
                modalidade: true,
                salario: "R$ 7.000 - R$ 10.000",
                tipo_carga_horaria: "Full-time",
                beneficios: ["Home office", "Plano de saúde"],
                crescimento: 7
            }
        ];

        let vagasFiltradas = vagasMock;
        if (termo_filtro) {
            vagasFiltradas = vagasMock.filter(v => 
                v.titulo.toLowerCase().includes(termo_filtro.toLowerCase()) ||
                v.empresa.toLowerCase().includes(termo_filtro.toLowerCase())
            );
        }

        res.json({
            sucesso: true,
            modo: "teste (dados mockados)",
            dados: {
                total_vagas: vagasFiltradas.length,
                vagas: vagasFiltradas,
                crescimento_total: vagasFiltradas.reduce((sum, v) => sum + v.crescimento, 0),
                termo_busca: termo_busca,
                termo_filtro: termo_filtro || ""
            }
        });

    } catch (error) {
        console.error('Erro ao buscar vagas:', error);
        res.status(500).json({ 
            erro: "Erro ao buscar vagas: " + error.message 
        });
    }
};

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
            pythonPath: PYTHON_CMD, // <--- Usa o comando definido no topo
            pythonOptions: ['-u'],
            scriptPath: path.join(__dirname, '../../'),
            args: [termo_busca, termo_filtro || '']
        };

        console.log('🔧 Configuração Python:');
        console.log('   Comando:', PYTHON_CMD);
        console.log('   Script Path:', options.scriptPath);
        console.log('   Script completo:', path.join(options.scriptPath, 'futuro_do_trabalho_api.py'));
        console.log('   Args:', options.args);

        const results = await new Promise((resolve, reject) => {
            PythonShell.run('futuro_do_trabalho_api.py', options, (err, results) => {
                if (err) {
                    console.error('❌ Erro ao executar Python:', err);
                    reject(err);
                }
                console.log('✅ Python executado com sucesso!');
                console.log('📦 Resultado:', results);
                resolve(results);
            });
        });

        res.json({
            sucesso: true,
            modo: "python (API real)",
            dados: results[0]
        });

    } catch (error) {
        console.error('❌ Erro completo:', error);
        
        res.status(500).json({ 
            erro: "Erro ao executar Python",
            detalhes: error.message,
            comando_python_usado: PYTHON_CMD,
            solucao: [
                "1. Verifique se o Python está instalado: abra um novo terminal e digite 'py --version' ou 'python --version'",
                "2. Se funcionar, altere a constante PYTHON_CMD no arquivo src/controllers/jobController.js",
                "3. Ou use a rota /vagas/teste para dados mockados"
            ]
        });
    }
};

module.exports = {
    buscarVagas,
    buscarVagasTeste
};