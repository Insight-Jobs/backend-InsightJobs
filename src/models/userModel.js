const fs = require('fs').promises;
const path = require('path');

const dbPath = path.join(__dirname, '../data/user.json');

async function getAllUsers() {
    const data = await fs.readFile(dbPath, 'utf8');
    return JSON.parse(data);
}

async function createUser(newUser) {
    const users = await getAllUsers();
    users.push(newUser);
    await fs.writeFile(dbPath, JSON.stringify(users, null, 2));
    return newUser;
}

module.exports = {
    getAllUsers,
    createUser
};