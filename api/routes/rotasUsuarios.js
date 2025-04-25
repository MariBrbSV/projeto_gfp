import { BD } from '../db.js';
    import bcrypt from 'bcrypt';
    import jwt from 'jsonwebtoken';

    const SECRET_KEY = "chave_api_gfp"



    class rotasUsuarios {
        static async novoUsuario(req, res) {
            const { nome, email, senha, tipo_acesso } = req.body;

            if (!nome || !email || !senha || !tipo_acesso) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
            }

            const saltRounds = 10;
            const senhaCriptografada = await bcrypt.hash(senha, saltRounds);
            try {
                const query = `INSERT INTO usuarios (nome, email, senha, tipo_acesso) VALUES($1, $2, $3, $4)`;
                const valores = [nome, email, senhaCriptografada, tipo_acesso];
                await BD.query(query, valores);

                res.status(201).json({ message: "✅👤 Usuário cadastrado com sucesso." });
            } catch (error) {
                console.error('Erro ao criar usuário:', error);
                res.status(500).json({ message: 'Erro ao criar usuário.', error: error.message });
            }
        }

        // ------------------------------------------------
        static async listarUsuarios(req, res) {
            try {
                const usuarios = await BD.query('SELECT * FROM usuarios');
                return res.status(200).json(usuarios.rows);
            } catch (error) {
                console.error('Erro ao listar usuários:', error);
                res.status(500).json({ message: 'Erro ao listar os usuários.', error: error.message });
            }
        }

        // ------------------------------------------------
        static async deletar(req, res) {
            const { id_usuario } = req.params;

            if (!id_usuario) {
                return res.status(400).json({ message: 'ID do usuário é obrigatório.' });
            }

            try {
                const resultado = await BD.query('UPDATE usuarios SET ativo = false WHERE id_usuario = $1 RETURNING *', [id_usuario]);

                if (resultado.rowCount === 0) {
                    return res.status(404).json({ message: 'Usuário desativado com sucesso.' });
                }

                return res.status(200).json({ message: "✅ Usuário desativado com sucesso." });
            } catch (error) {
                console.error('Erro ao deletar usuário:', error);
                res.status(500).json({ message: "Erro ao deletar usuário.", error: error.message });
            }
        }

        // ------------------------------------------------

        static async listarUsuariosPorID(req,res){
            const {id_usuario} = req.params;
            try{
                const usuario = await BD.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id_usuario]);
                res.status(200).json(usuario.rows);
            } catch(error){
                res.status(500).json({message:
                    "Erro ao consultar o usuário", error: error.message})
            }
        }

        // ------------------------------------------------

        static async atualizarTodos(req, res){
            try{
                // const usuarios = await Usuario.listar(); //chamar o metodo listar na model usuario
                const usuarios = await BD.query('SELECT * FROM usuarios');
                return res.status(200).json(usuarios.rows); //retorna a lista de usuarios.
            }catch(error){
                res.status(500).json({message: 
                    'Erro ao listar os usuarios', error: error.message})
            }
        }

        
        // ------------------------------------------------

        static async Login(req, res) {
            const { email, senha } = req.body;

            try {
                const resultado = await BD.query(
                    `SELECT * FROM usuarios WHERE email = $1 and ativo = true`, [email]
                );

                const usuario = resultado.rows[0];

                // Verifica se o usuário foi encontrado
                if (!usuario) {
                    return res.status(404).json({ error: "Usuário não encontrado ou inativo" });
                }

                // Verifica se a senha é válida
                const senhaValida = await bcrypt.compare(senha, usuario.senha);
                if (!senhaValida) {
                    return res.status(401).json({ error: "Senha incorreta" });
                }

                // Gera o token JWT
                const token = jwt.sign(
                    { id: usuario.id_usuario, nome: usuario.nome, email: usuario.email },
                    SECRET_KEY
                    // { expiresIn: '1h' } // Descomente para adicionar expiração ao token
                );

                return res.status(200).json({
                    token,
                    id_usuario: usuario.id_usuario,
                    nome: usuario.nome,
                    email: usuario.email,
                    tipo_acesso: usuario.tipo_acesso
                });

            } catch (error) {
                console.error("Erro ao fazer login:", error);
                res.status(500).json({ error: "Erro ao fazer login" });
            }
        }

        // ------------------------------------------------
        static async Atualizar(req, res) {
            const { id_usuario } = req.params; // Corrigido para usar id_usuario
            const { nome, email, senha, tipo_acesso } = req.body;
            try {
                const campos = [];
                const valores = [];

                // Verifica quais campos foram fornecidos
                if (nome !== undefined) {
                    campos.push(`nome = $${valores.length + 1}`);
                    valores.push(nome);
                }
                if (email !== undefined) {
                    campos.push(`email = $${valores.length + 1}`);
                    valores.push(email);
                }
                if (senha !== undefined) {
                    campos.push(`senha = $${valores.length + 1}`);
                    const saltRounds = 10;
                    const senhaCriptografada = await bcrypt.hash(senha, saltRounds);
                    valores.push(senhaCriptografada);
                }
                if (tipo_acesso !== undefined) {
                    campos.push(`tipo_acesso = $${valores.length + 1}`);
                    valores.push(tipo_acesso);
                }
                if (campos.length === 0) {
                    return res.status(400).json({ mensagem: "Nenhum campo fornecido" });
                }

                // Montar a query
                const query = `UPDATE usuarios SET ${campos.join(', ')} WHERE id_usuario = $${valores.length + 1} RETURNING *`;
                valores.push(id_usuario); // Adiciona o id_usuario como último parâmetro

                // Executar a query
                const usuario = await BD.query(query, valores);

                // Verifica se o usuário foi atualizado
                if (usuario.rows.length === 0) {
                    return res.status(404).json({ message: "Usuário não encontrado" });
                }
                return res.status(200).json(usuario.rows[0]);
            } catch (error) {
                return res.status(500).json({ message: "Erro ao atualizar dados do usuário", error: error.message });
            }
        }
    
    }

    export function autenticarToken(req, res, next){
        //Extrair do token o cabeçalho da requisição
        const token = req.headers['authorization'] //Bearer<token>
        //verificarse o token foi fornecido na requisição
        if(!token) return res.status(403).json({message: 'Token não fornecido'})

        //verificarse a validade do token
        //jwt.verify que valida se o token é legitimo
        jwt.verify(token.split(' ')[1], SECRET_KEY,(err, usuario) =>{
            if(err) return res.status(403).json({message: 'Token invalido'})
        
            //se o token for valido, adiciona os dados do usuario(decodificados no token)
            //tornando essas informaçoes disponiveis nas rotas que precisam da autenticação
            req.usuario = usuario;
            next();
        })
    }

    export default rotasUsuarios;