// models/userModel.js
const fs = require('fs').promises;
const path = require('path');

const userFilePath = path.join(__dirname, '../data/user.json');

// Função para ler o arquivo JSON
const readUsersFile = async () => {
  try {
    const data = await fs.readFile(userFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // Se o arquivo não existir, retorna um array vazio
    return [];
  }
};

// Função para escrever no arquivo JSON
const writeUsersFile = async (users) => {
  await fs.writeFile(userFilePath, JSON.stringify(users, null, 2));
};

// --- CADASTRAR USUÁRIO ---
const createUser = async (user) => {
  const users = await readUsersFile();
  users.push(user);
  await writeUsersFile(users);
};

// --- BUSCAR TODOS OS USUÁRIOS ---
const getAllUsers = async () => {
  return await readUsersFile();
};

// --- BUSCAR USUÁRIO POR ID ---
const getUserById = async (id) => {
  const users = await readUsersFile();
  return users.find(user => user.id === parseInt(id));
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById  // ← ESTA LINHA ESTAVA FALTANDO!
};