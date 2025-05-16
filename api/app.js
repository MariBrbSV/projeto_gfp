import express from 'express'
import { testarConexao } from './db.js'
import cors from 'cors'
import rotasUsuarios, { autenticarToken } from './routes/rotasUsuarios.js';
import rotasCategorias from './routes/rotasCategorias.js';
import rotasContas from './routes/rotasContas.js';
import rotasTransacoes from './routes/rotasTransacoes.js'

const app = express()
testarConexao();

app.use(cors());
app.use(express.json())

app.get('/',(req, res) =>{
    res.send('API Funcionando!')
})

//Rotas usuarios
app.post('/usuarios', rotasUsuarios.novoUsuario) // ✅
app.post('/usuarios/login', rotasUsuarios.Login) // ✅
app.get('/usuarios', rotasUsuarios.listarUsuarios) // ✅
// app.get('/usuarios', autenticarToken, rotasUsuarios.listarUsuarios) 
// app.get('/usuarios/:id_usuario', rotasUsuarios.listarUsuariosPorID)
app.patch('/usuarios/:id_usuario', rotasUsuarios.Atualizar) // ✅
// app.put('/usuarios/:id_usuario', rotasUsuarios.atualizarTodos)
app.delete('/usuarios/:id_usuario', rotasUsuarios.deletar) // ✅

// //rotas categorias
app.post('/categorias', rotasCategorias.nova); // ✅
app.get('/categorias/filtrarCategoria', rotasCategorias.filtrarCategoria); // ✅
app.get('/categorias', rotasCategorias.listar) // ✅
// app.get('/categorias/:id_categoria', rotasCategorias.listarCategoriasPorID) // ----
app.patch('/categorias/:id_categoria', rotasCategorias.atualizarCategoria) // ✅
app.put('/categorias/:id_categoria', rotasCategorias.atualizarTodosCategoria) // ✅
app.delete('/categorias/:id_categoria', rotasCategorias.deletarCategoria) // ✅

// //Rotas sub-categorias
// app.post('/subCategorias', rotasSubCategorias.nova)
// app.get('/subCategorias', rotasSubCategorias.listar)
// app.get('/subCategorias/:id_subCategoria', rotasSubCategorias.listarPorID)
// app.patch('/subCategorias/:id_subCategoria', rotasSubCategorias.atualizar)
// app.put('/subCategorias/:id_subCategoria', rotasSubCategorias.atualizarTodos)
// app.delete('/subCategorias/:id_subCategoria', rotasSubCategorias.deletar)

//Rotas Contas
app.post('/contas', rotasContas.nova) // ✅
app.get('/contas', rotasContas.listar) // ✅
// app.get('/contas/:id_conta', rotasContas.listarPorID)
app.patch('/contas/:id_conta', rotasContas.atualizar) // ✅
app.put('/contas/:id_conta', rotasContas.atualizarTodos) // ✅
// app.delete('/contas/:id_conta', rotasContas.deletar)
app.get('/contas/filtrarConta', rotasContas.filtrarConta); // ✅


// //Rotas Transacoes
app.get('/transacao/filtroData', rotasTransacoes.filtrarPorData) // ✅
app.post('/transacao', rotasTransacoes.nova) // ✅
app.get('/transacao/somarTransacoes', rotasTransacoes.somarTransacoes); // ✅
app.get('/transacao/transacoesVencidas/:id_usuario', rotasTransacoes.transacoesVencidas) // ✅
// app.get('/transacao', rotasTransacoes.listar)
// app.get('/transacao/:id_transacao', rotasTransacoes.listarPorID)
// app.patch('/transacao/:id_transacao', rotasTransacoes.atualizar)
// app.put('/transacao/:id_transacao', rotasTransacoes.atualizarTodos)
// app.delete('/transacao/:id_transacao', rotasTransacoes.deletar)


const porta = 3000;
app.listen(porta, () =>{
    console.log(`Api http://localhost:${porta}`)
})

