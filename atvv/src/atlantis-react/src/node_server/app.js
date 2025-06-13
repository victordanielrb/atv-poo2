const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do MongoDB
const uri = "mongodb+srv://root:root@cluster0.350j2fh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let db = null;

// Conectar ao MongoDB
async function connectToDatabase() {
    try {
        await client.connect();
        db = client.db('atlantis');
        console.log('Conectado ao MongoDB!');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        process.exit(1);
    }
}

// Middleware para verificar conexão
function ensureDbConnection(req, res, next) {
    if (!db) {
        return res.status(500).json({ error: 'Database não conectado' });
    }
    next();
}

// ROTAS PARA CLIENTES

// GET - Buscar todos os clientes
app.get('/api/clientes', ensureDbConnection, async (req, res) => {
    try {
        const clientes = await db.collection('clientes').find({}).toArray();
        res.json(clientes);
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
});

// GET - Buscar clientes por nome
app.get('/api/clientes/buscar/:nome', ensureDbConnection, async (req, res) => {
    try {
        const { nome } = req.params;
        const clientes = await db.collection('clientes')
            .find({ nome: { $regex: nome, $options: 'i' } })
            .toArray();
        res.json(clientes);
    } catch (error) {
        console.error('Erro ao buscar clientes por nome:', error);
        res.status(500).json({ error: 'Erro ao buscar clientes por nome' });
    }
});

// GET - Buscar titulares
app.get('/api/clientes/titulares', ensureDbConnection, async (req, res) => {
    try {
        const titulares = await db.collection('clientes')
            .find({ titular: { $exists: false } })
            .toArray();
        res.json(titulares);
    } catch (error) {
        console.error('Erro ao buscar titulares:', error);
        res.status(500).json({ error: 'Erro ao buscar titulares' });
    }
});

// GET - Buscar dependentes
app.get('/api/clientes/dependentes', ensureDbConnection, async (req, res) => {
    try {
        const dependentes = await db.collection('clientes')
            .find({ titular: { $exists: true } })
            .toArray();
        res.json(dependentes);
    } catch (error) {
        console.error('Erro ao buscar dependentes:', error);
        res.status(500).json({ error: 'Erro ao buscar dependentes' });
    }
});

// POST - Adicionar cliente
app.post('/api/clientes', ensureDbConnection, async (req, res) => {
    try {
        const cliente = req.body;
        
        // Validações básicas
        if (!cliente.nome || !cliente.dataNascimento) {
            return res.status(400).json({ error: 'Nome e data de nascimento são obrigatórios' });
        }
        
        if (!cliente.telefones || cliente.telefones.length === 0) {
            return res.status(400).json({ error: 'Pelo menos um telefone é obrigatório' });
        }

        const result = await db.collection('clientes').insertOne(cliente);
        res.status(201).json({ 
            success: true, 
            id: result.insertedId,
            message: 'Cliente adicionado com sucesso'
        });
    } catch (error) {
        console.error('Erro ao adicionar cliente:', error);
        res.status(500).json({ error: 'Erro ao adicionar cliente' });
    }
});

// PUT - Atualizar cliente
app.put('/api/clientes/:id', ensureDbConnection, async (req, res) => {
    try {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        
        const result = await db.collection('clientes').updateOne(
            { _id: new ObjectId(id) },
            { $set: dadosAtualizados }
        );
        
        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        
        res.json({ success: true, message: 'Cliente atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
});

// DELETE - Remover cliente
app.delete('/api/clientes/:id', ensureDbConnection, async (req, res) => {
    try {
        const { id } = req.params;
        
        // Verificar se o cliente tem dependentes
        const dependentes = await db.collection('clientes')
            .find({ 'titular._id': new ObjectId(id) })
            .toArray();
            
        if (dependentes.length > 0) {
            return res.status(400).json({ 
                error: 'Não é possível remover um titular que possui dependentes' 
            });
        }
        
        const result = await db.collection('clientes').deleteOne({ _id: new ObjectId(id) });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        
        res.json({ success: true, message: 'Cliente removido com sucesso' });
    } catch (error) {
        console.error('Erro ao remover cliente:', error);
        res.status(500).json({ error: 'Erro ao remover cliente' });
    }
});

// POST - Anexar dependente
app.post('/api/clientes/anexar-dependente', ensureDbConnection, async (req, res) => {
    try {
        const { dependente, titularId } = req.body;
        
        // Buscar o titular
        const titular = await db.collection('clientes').findOne({ _id: new ObjectId(titularId) });
        if (!titular) {
            return res.status(404).json({ error: 'Titular não encontrado' });
        }
        
        // Definir o titular no dependente
        dependente.titular = titular;
        
        // Adicionar o dependente
        const result = await db.collection('clientes').insertOne(dependente);
        
        // Atualizar o titular para incluir o dependente na lista
        await db.collection('clientes').updateOne(
            { _id: new ObjectId(titularId) },
            { $push: { dependentes: dependente } }
        );
        
        res.status(201).json({ 
            success: true, 
            id: result.insertedId,
            message: 'Dependente anexado com sucesso'
        });
    } catch (error) {
        console.error('Erro ao anexar dependente:', error);
        res.status(500).json({ error: 'Erro ao anexar dependente' });
    }
});

// ROTAS PARA ACOMODAÇÕES

// GET - Buscar todas as acomodações
app.get('/api/acomodacoes', ensureDbConnection, async (req, res) => {
    try {
        const acomodacoes = await db.collection('acomodacoes').find({}).toArray();
        res.json(acomodacoes);
    } catch (error) {
        console.error('Erro ao buscar acomodações:', error);
        res.status(500).json({ error: 'Erro ao buscar acomodações' });
    }
});

// POST - Adicionar acomodação
app.post('/api/acomodacoes', ensureDbConnection, async (req, res) => {
    try {
        const acomodacao = req.body;
        
        if (!acomodacao.nomeAcomodacao) {
            return res.status(400).json({ error: 'Nome da acomodação é obrigatório' });
        }
        
        const result = await db.collection('acomodacoes').insertOne(acomodacao);
        res.status(201).json({ 
            success: true, 
            id: result.insertedId,
            message: 'Acomodação adicionada com sucesso'
        });
    } catch (error) {
        console.error('Erro ao adicionar acomodação:', error);
        res.status(500).json({ error: 'Erro ao adicionar acomodação' });
    }
});

// PUT - Atualizar acomodação
app.put('/api/acomodacoes/:id', ensureDbConnection, async (req, res) => {
    try {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        
        const result = await db.collection('acomodacoes').updateOne(
            { _id: new ObjectId(id) },
            { $set: dadosAtualizados }
        );
        
        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: 'Acomodação não encontrada' });
        }
        
        res.json({ success: true, message: 'Acomodação atualizada com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar acomodação:', error);
        res.status(500).json({ error: 'Erro ao atualizar acomodação' });
    }
});

// DELETE - Remover acomodação
app.delete('/api/acomodacoes/:id', ensureDbConnection, async (req, res) => {
    try {
        const { id } = req.params;
        
        const result = await db.collection('acomodacoes').deleteOne({ _id: new ObjectId(id) });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Acomodação não encontrada' });
        }
        
        res.json({ success: true, message: 'Acomodação removida com sucesso' });
    } catch (error) {
        console.error('Erro ao remover acomodação:', error);
        res.status(500).json({ error: 'Erro ao remover acomodação' });
    }
});

// POST - Anexar acomodação a cliente
app.post('/api/acomodacoes/anexar', ensureDbConnection, async (req, res) => {
    try {
        const { acomodacaoId, clienteId } = req.body;
        
        // Atualizar a acomodação com o cliente
        const cliente = await db.collection('clientes').findOne({ _id: new ObjectId(clienteId) });
        const acomodacao = await db.collection('acomodacoes').findOne({ _id: new ObjectId(acomodacaoId) });
        
        if (!cliente || !acomodacao) {
            return res.status(404).json({ error: 'Cliente ou acomodação não encontrados' });
        }
        
        await db.collection('acomodacoes').updateOne(
            { _id: new ObjectId(acomodacaoId) },
            { $set: { cliente } }
        );
        
        await db.collection('clientes').updateOne(
            { _id: new ObjectId(clienteId) },
            { $set: { acomodacao } }
        );
        
        res.json({ success: true, message: 'Acomodação anexada com sucesso' });
    } catch (error) {
        console.error('Erro ao anexar acomodação:', error);
        res.status(500).json({ error: 'Erro ao anexar acomodação' });
    }
});

// Rota de teste
app.get('/api/test', (req, res) => {
    res.json({ message: 'Servidor funcionando!', timestamp: new Date() });
});

// Inicializar servidor
async function startServer() {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
        console.log(`API disponível em http://localhost:${PORT}/api`);
    });
}

startServer().catch(console.error);