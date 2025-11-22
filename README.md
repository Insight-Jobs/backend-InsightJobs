# API Insight Jobs

### Integrantes
* **Kelwin Silva** (RM: 566348)
* **Pedro Almeida** (RM: 564711)
* **João Paulo** (RM: 565383)

Esta é uma API RESTful desenvolvida com **Node.js** e **Python (Flask)** para cadastro, autenticação de usuários e busca inteligente de vagas de emprego. A aplicação combina autenticação JWT com integração à API JSearch (RapidAPI) para fornecer dados atualizados sobre oportunidades profissionais.

---

## 🚀 Como Rodar o Projeto

### 1. Instalação

#### Backend Node.js
Abra o terminal na pasta do projeto Node.js e instale as dependências:
```bash
npm install
```

#### Backend Python (Flask)
Navegue até a pasta do serviço Python e instale as dependências:
```bash
pip install flask flask-cors requests python-dotenv
```

### 2. Configuração (.env)

Crie um arquivo `.env` na raiz de cada projeto:

#### Node.js (.env)
```env
SEGREDO="sua_senha_super_secreta_aqui"
```

#### Python/Flask (.env)
```env
rapidapi-key="sua_chave_rapidapi_aqui"
rapidapi-host="jsearch.p.rapidapi.com"
```

> 💡 **Obtenha sua chave RapidAPI:** Acesse [RapidAPI JSearch](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch) e crie uma conta gratuita.

### 3. Execução

#### Servidor Node.js (Porta 3000)
```bash
node server.js
```

#### Servidor Flask (Porta 5000)
```bash
python app.py
```

Os servidores estarão disponíveis em:
- **Node.js:** `http://localhost:3000`
- **Flask:** `http://localhost:5000`

---

## 📡 Documentação das Rotas

### 🔓 Rotas Públicas (Node.js - Porta 3000)

#### 1. Cadastrar Usuário
Cria uma nova conta no sistema.
- **Método:** `POST`
- **URL:** `/cadastro`
- **Body (JSON):**
```json
{
  "nome": "Pedro",
  "email": "pedro@email.com",
  "senha": "123456",
  "cargo": "Engenheiro de Software",
  "habilidadesTecnicas": ["Node.js", "React"]
}
```

#### 2. Fazer Login
Autentica o usuário e retorna o Token de acesso.
- **Método:** `POST`
- **URL:** `/login`
- **Body (JSON):**
```json
{
  "email": "pedro@email.com",
  "senha": "123456"
}
```
- **Resposta:** `{ "token": "..." }`

---

### 🔒 Rotas Privadas (Node.js - Porta 3000)

⚠️ **Obrigatório:** Enviar o Token no Header da requisição.
- **Key:** `Authorization`
- **Value:** `Bearer SEU_TOKEN_AQUI`

#### 3. Listar Usuários
- **Método:** `GET`
- **URL:** `/usuarios`
- **Descrição:** Retorna a lista de usuários cadastrados (requer autenticação).

---

### 💼 API de Vagas (Python/Flask - Porta 5000)

#### 4. Buscar Vagas
Busca vagas de emprego via API JSearch com filtros opcionais.
- **Método:** `GET`
- **URL:** `/api/vagas`
- **Query Params:**
  - `termo_busca` (obrigatório): Palavra-chave para buscar vagas (ex: "Python Developer")
  - `termo_filtro` (opcional): Termo adicional para filtrar resultados (ex: "São Paulo")

**Exemplo de requisição:**
```
GET http://localhost:5000/api/vagas?termo_busca=desenvolvedor&termo_filtro=remoto
```

**Resposta (JSON):**
```json
{
  "total_vagas": 10,
  "vagas": [
    {
      "titulo": "Desenvolvedor Python",
      "empresa": "Tech Company",
      "local": "São Paulo",
      "plataforma": "LinkedIn",
      "modalidade": true,
      "salario": "R$ 8.000 - R$ 12.000",
      "tipo_carga_horaria": "FULLTIME",
      "beneficios": ["Vale transporte", "Plano de saúde"],
      "descricao": "Vaga para desenvolvedor...",
      "crescimento": 7,
      "link": "https://...",
      "opcoes_aplicacao": [...]
    }
  ],
  "crescimento_total": 65,
  "termo_busca": "desenvolvedor",
  "termo_filtro": "remoto"
}
```

#### 5. Health Check
Verifica se a API Flask está funcionando.
- **Método:** `GET`
- **URL:** `/api/health`
- **Resposta:** `{ "status": "API está funcionando corretamente" }`

---

## 📂 Estrutura de Pastas

### Backend Node.js
| Pasta | Descrição |
|:---|:---|
| `src/config` | Configurações globais (segredo JWT) |
| `src/controllers` | Regras de negócio (validações, lógica de login) |
| `src/data` | Armazenamento de dados (`user.json`) |
| `src/middleware` | Interceptadores (verificação de Token JWT) |
| `src/models` | Acesso direto aos dados (leitura/escrita) |
| `src/routes` | Definição dos endpoints da API |

### Backend Python/Flask
| Arquivo | Descrição |
|:---|:---|
| `app.py` | Servidor Flask com endpoints de vagas |
| `.env` | Credenciais da API RapidAPI |
| `requirements.txt` | Dependências Python (opcional) |

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Autenticação e gerenciamento de usuários
- **Flask** - API de busca de vagas
- **JWT** - Autenticação segura
- **RapidAPI (JSearch)** - Dados de vagas em tempo real
- **Flask-CORS** - Comunicação entre frontend e backend

---

## 🔒 Segurança

- Senhas são armazenadas com hash bcrypt
- Tokens JWT expiram automaticamente
- Validação de dados em todas as rotas
- CORS configurado para requisições seguras

---

## 📝 Próximos Passos

- [ ] Migrar de arquivo JSON para banco de dados (MongoDB/PostgreSQL)
- [ ] Adicionar refresh tokens
- [ ] Implementar cache de resultados de vagas
- [ ] Criar painel administrativo
- [ ] Deploy em produção (Heroku/Vercel/AWS)

---

## 📞 Suporte

Para dúvidas ou problemas, entre em contato com a equipe através dos RMs listados acima.
