// Este arquivo não é mais necessário - as operações de banco agora são feitas pelo servidor Node.js
// Mantido apenas para compatibilidade, mas todas as funções agora usam requisições HTTP

export default class DatabaseService {
    static async connect() {
        console.log('DatabaseService.connect() - Agora usando servidor Node.js');
        return true;
    }

    static isConnected() {
        return true;
    }

    static async disconnect() {
        console.log('DatabaseService.disconnect() - Agora usando servidor Node.js');
    }
}