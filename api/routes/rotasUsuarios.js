import { BD } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



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
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            return res.status(200).json({ message: "✅ Usuário deletado com sucesso." });
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

    static async Login(req,res){
        const { email, senha } = req.body;
        try {
            const usuario = await BD.query(`SELECT * FROM usuarios WHERE email = $1`, [email]);
            if (usuario.rows.length === 0) {
                return res.status(401).json({ error: "Usuário não encontrado" });
            }
            const usuarioEncontrado = usuario.rows[0];
            const senhaCorreta = await bcrypt.compare(senha, usuarioEncontrado.senha);
            if (!senhaCorreta) {
                return res.status(401).json({ error: "Senha incorreta" });
            }

            return res.status(200).json({message: 'Login executado com sucesso'});

        } catch (error) {
            console.error("Erro ao fazer login:", error);
            res.status(500).json({ error: "Erro ao fazer login" });
        }
    }




    // ------------------------------------------------
    static async atualizar(req, res) {
        const { id_usuario } = req.params;
        const { nome, email, senha, tipo_acesso } = req.body;

        if (!id_usuario) {
            return res.status(400).json({ message: 'ID do usuário é obrigatório.' });
        }

        try {
            const campos = [];
            const valores = [];

            if (nome) {
                campos.push(`nome = $${valores.length + 1}`);
                valores.push(nome);
            }

            if (email) {
                campos.push(`email = $${valores.length + 1}`);
                valores.push(email);
            }

            if (senha) {
                const senhaCriptografada = await bcrypt.hash(senha, 10);
                campos.push(`senha = $${valores.length + 1}`);
                valores.push(senhaCriptografada);
            }

            if (tipo_acesso) {
                campos.push(`tipo_acesso = $${valores.length + 1}`);
                valores.push(tipo_acesso);
            }

            if (campos.length === 0) {
                return res.status(400).json({ message: 'Nenhum campo fornecido para atualização.' });
            }

            valores.push(id_usuario);

            const query = `UPDATE usuarios SET ${campos.join(', ')} WHERE id_usuario = $${valores.length} RETURNING *`;
            const resultado = await BD.query(query, valores);

            if (resultado.rowCount === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            return res.status(200).json(resultado.rows[0]);
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            res.status(500).json({ message: "Erro ao atualizar o usuário.", error: error.message });
        }
    }
}

export default rotasUsuarios;