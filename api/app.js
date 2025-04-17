import express from 'express';
import { testarConexao } from './db.js';
import cors from 'cors';
import rotasUsuarios from './routes/rotasUsuarios.js';                           // ✅  
import rotasCategorias from './routes/rotasCategorias.js'                        // ✅
import rotasSubCategorias from './routes/rotasSubCategorias.js'                  // ✅❌
import rotasTransacoes from './routes/rotasTransacoes.js'                  // ✅❌



const app = express();
testarConexao();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`API Funcionando! ✅`);
});

// 👤 Rotas Usuários

// POST (CRIAR)
app.post('/usuarios', rotasUsuarios.novoUsuario);                        // ✅ funcionando
app.post('/usuarios/login', rotasUsuarios.Login);                        // ✅ funcionando


// GET (BUSCAR)
app.get('/usuarios/listar', rotasUsuarios.listarUsuarios);               // ✅ funcionando
app.get('/usuarios/:id_usuario', rotasUsuarios.listarUsuariosPorID);     // // ✅ funcionando


// DELETE (DELETAR)
app.delete('/usuarios/:id_usuario', rotasUsuarios.deletar);              // ✅ funcionando

// PATCH (ATUALIZAR)
app.patch('/usuarios/:id_usuario', rotasUsuarios.atualizar);             // ✅funcionando 

// PUT (ATUALIZAR)
app.put('usuarios/:id_usuario', rotasUsuarios.atualizarTodos);           // ✅funcionando 

// ---------------------------------------------------------------------------------------------
// 🧾 Rotas Categorias

// POST (CRIAR)
app.post('/categorias', rotasCategorias.nova);                           // ✅funcionando

// GET (BUSCAR)
app.get('/categorias', rotasCategorias.listarCategorias);                         // ✅funcionando
app.get('/categorias/:id_categoria', rotasCategorias.listarCategoriasPorID);      // ✅funcionando

// DELETE (DELETAR)
app.delete('/categorias/:id_categoria', rotasCategorias.deletarCategoria);        // ✅ funcionando       

// PATCH (ATUALIZAR)
app.patch('/categorias/:id_categoria', rotasCategorias.atualizar);             // ✅funcionando  

// PUT (ATUALIZAR)
app.put('/categorias/:id_categoria', rotasCategorias.atualizarTodosCategoria);           // ✅funcionando 

// ---------------------------------------------------------------------------------------------
// 🗨 Rotas SubCategorias

// POST (CRIAR)
app.post('/subCategorias', rotasSubCategorias.nova);                           // ✅funcionando

// GET (BUSCAR)
app.get('/subCategorias', rotasSubCategorias.listarSubCategorias);                         // ✅funcionando
app.get('/subCategorias/:id_subcategoria', rotasSubCategorias.listarSubCategoriasPorID);      // ❌ não está funcionando

// DELETE (DELETAR)
app.delete('/subCategorias/:id_subcategoria', rotasSubCategorias.deletarSubCategoria);        // ❌ não está funcionando

// ---------------------------------------------------------------------------------------------
// 🗨 Rotas Transações

// POST (CRIAR)
app.post('/transacoes', rotasTransacoes.nova);                           // ✅funcionando





// Tratamento para rotas não encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Rota não encontrada.' });
});

const porta = 3000;
app.listen(porta, () => {
    console.log(`🚀 API rodando em http://localhost:${porta}`);
});