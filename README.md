
# API Insight Jobs

### Integrantes
* **Kelwin Silva** (RM: 566348)
* **Pedro Almeida** (RM: 564711)
* **João Paulo** (RM: 565383)

Esta é uma API RESTful desenvolvida em Node.js para cadastro e autenticação de usuários. Os dados são armazenados localmente em um arquivo JSON (`src/data/user.json`) e a segurança é feita via JWT (JSON Web Token).

## 🚀 Como Rodar o Projeto

### 1. Instalação
Abra o terminal na pasta do projeto e instale as dependências:
```bash
npm install
````

### 2\. Configuração (.env)

Crie um arquivo chamado `.env` na raiz do projeto (onde está o `package.json`) e defina sua senha secreta:

```env
SEGREDO="sua_senha_super_secreta_aqui"
```

### 3\. Execução

Inicie o servidor:

```bash
node server.js
```

O servidor rodará em: `http://localhost:3000`

-----

## 📡 Documentação das Rotas

### 🔓 Rotas Públicas

#### 1\. Cadastrar Usuário

Cria uma nova conta no sistema.

  - **Método:** `POST`
  - **URL:** `/cadastro`
  - **Body (JSON):**

<!-- end list -->

```json
{
  "nome": "Pedro",
  "email": "pedro@email.com",
  "senha": "123456",
  "cargo": "Engenheiro de Software",
  "habilidadesTecnicas": ["Node.js", "React"]
}
```

#### 2\. Fazer Login

Autentica o usuário e retorna o Token de acesso.

  - **Método:** `POST`
  - **URL:** `/login`
  - **Body (JSON):**

<!-- end list -->

```json
{
  "email": "pedro@email.com",
  "senha": "123456"
}
```

  - **Resposta:** Retorna um objeto `{ "token": "..." }`.

-----

### 🔒 Rotas Privadas

⚠️ **Obrigatório:** Enviar o Token no Header da requisição.

  - **Key:** `Authorization`
  - **Value:** `Bearer SEU_TOKEN_AQUI`

#### 3\. Listar Usuários (Teste de Auth)

  - **Método:** `GET`
  - **URL:** `/usuarios`
  - **Descrição:** Retorna a lista de usuários apenas se o token for válido.

-----

## 📂 Estrutura de Pastas

| Pasta | Descrição |
| :--- | :--- |
| `src/config` | Configurações globais (ex: auth secret). |
| `src/controllers` | Regras de negócio (Validações, logica de login). |
| `src/data` | Armazenamento de dados (`user.json`). |
| `src/middleware` | Interceptadores (Verificação de Token JWT). |
| `src/models` | Acesso direto aos dados (Leitura/Escrita de arquivo). |
| `src/routes` | Definição dos endpoints da API. |

```
