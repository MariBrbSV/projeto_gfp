import express from 'express'
import { testarConexao } from './db.js'
import cors from 'cors'
import rotasUsuarios, { autenticarToken } from './routes/rotasUsuarios.js';
import rotasCategorias from './routes/rotasCategorias.js';

const app = express()
testarConexao();

app.use(cors());
app.use(express.json())

app.get('/',(req, res) =>{
    res.send('API Funcionando!')
})

//Rotas usuarios
app.post('/usuarios', rotasUsuarios.novoUsuario)
app.post('/usuarios/login', rotasUsuarios.Login)
app.get('/usuarios', rotasUsuarios.listarUsuarios)
app.get('/usuarios', autenticarToken, rotasUsuarios.listarUsuarios)
// app.get('/usuarios/:id_usuario', rotasUsuarios.listarUsuariosPorID)
app.patch('/usuarios/:id_usuario', rotasUsuarios.Atualizar)
// app.put('/usuarios/:id_usuario', rotasUsuarios.atualizarTodos)
app.delete('/usuarios/:id_usuario', rotasUsuarios.deletar)

// //rotas categorias
app.post('/categorias', rotasCategorias.nova);
// app.get('/categorias', rotasCategorias.listar)
// app.get('/categorias/:id_categoria', rotasCategorigas.listarPorID)
// app.patch('/categorias/:id_categoria', rotasCategorias.atualizar)
// app.put('/categorias/:id_categoria', rotasCategorias.atualizarTodos)
// app.delete('/categorias/:id_categoria', rotasCategorias.deletar)

// //Rotas sub-categorias
// app.post('/subCategorias', rotasSubCategorias.nova)
// app.get('/subCategorias', rotasSubCategorias.listar)
// app.get('/subCategorias/:id_subCategoria', rotasSubCategorias.listarPorID)
// app.patch('/subCategorias/:id_subCategoria', rotasSubCategorias.atualizar)
// app.put('/subCategorias/:id_subCategoria', rotasSubCategorias.atualizarTodos)
// app.delete('/subCategorias/:id_subCategoria', rotasSubCategorias.deletar)

// //Rotas local Transacao
// app.post('/localTransacao', rotaslocalTransacoes.nova)
// app.get('/localTransacao', rotaslocalTransacoes.listar)
// app.get('/localTransacao/:id_localTransacao', rotaslocalTransacoes.listarPorID)
// app.patch('/localTransacao/:id_localTransacao', rotaslocalTransacoes.atualizar)
// app.put('/localTransacao/:id_localTransacao', rotaslocalTransacoes.atualizarTodos)
// app.delete('/localTransacao/:id_localTransacao', rotaslocalTransacoes.deletar)

// //Rotas Transacoes
// app.post('/transacao', rotasTransacoes.nova)
// app.get('/transacao', rotasTransacoes.listar)
// app.get('/transacao/:id_transacao', rotasTransacoes.listarPorID)
// app.patch('/transacao/:id_transacao', rotasTransacoes.atualizar)
// app.put('/transacao/:id_transacao', rotasTransacoes.atualizarTodos)
// app.delete('/transacao/:id_transacao', rotasTransacoes.deletar)


const porta = 3000;
app.listen(porta, () =>{
    console.log(`Api http://localhost:${porta}`)
})

