import { BD } from '../db.js';

const SECRET_KEY = "chave_api_gfp"

class rotasContas{
    static async nova (req,res) {
        const { nome, tipo_conta, saldo, ativo, conta_padrao } = req.body;
        try {
            const sql = `INSERT INTO contas(nome, tipo_conta, saldo, ativo, conta_padrao) VALUES ($1, $2, $3, $4, $5)`
            const valores = [nome, tipo_conta, saldo, ativo, conta_padrao]
            const contas = await BD.query(sql, valores)
            res.status(201).json('Conta cadastrada')
        } catch (error) {
            console.error("Erro ao criar transação", error);
            res.status(500).json({message: "Erro ao criar transação", error: error.message});
        }
    }
    static async listar(req,res) {
        try {
            const resultado = await BD.query (`SELECT * from contas`);
            res.json({transacoes: resultado.rows});
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao buscar transação', erro: error.message});
        }
    }
    static async listarPorID (req,res) {
         const { id } = req.params
         try{
            const contas = await BD.query(`SELECT * FROM contas WHERE id_conta = $1`, [id]);
            res.status(200).json(TransformStreamDefaultController.rows[0]);
         } catch (error){
            res.status(500).json({message: "Erro ao consultar contas", error: error.message})
         }
    }

    static async atualizarTodos(req, res) {
        const { id_conta } = req.params
        const { nome, tipo_conta, saldo, ativo, conta_padrao } = req.body;

        try {
            const conta = await BD.query('UPDATE contas SET nome = $1, tipo_conta = $2, saldo = $3, ativo = $4, conta_padrao = $5 where id_conta = $6',
                [nome, tipo_conta, saldo, ativo, conta_padrao, id_conta]
            )
            res.status(201).json('Conta atualizada')
            res.status(201).json(conta.rows[0])
        } catch (error) {
            res.status(500).json({ message: "Erro ao consultar as contas", error: error.message })
        }
    }

     static async atualizar(req, res) {
        const { id_conta } = req.params
        const { nome, tipo_conta, saldo, ativo, conta_padrao } = req.body;

        try {
            const campos = [];
            const valores = [];

            if (nome !== undefined) {
                campos.push(`nome = $${valores.length + 1}`)
                valores.push(nome);
            }

            if (tipo_conta !== undefined) {
                campos.push(`tipo_conta = $${valores.length + 1}`)
                valores.push(tipo_conta);
            }

            if (saldo !== undefined) {
                campos.push(`saldo = $${valores.length + 1}`)
                valores.push(saldo);
            }

            if (ativo !== undefined) {
                campos.push(`ativo = $${valores.length + 1}`)
                valores.push(ativo);
            }

            if (conta_padrao !== undefined) {
                campos.push(`conta_padrao = $${valores.length + 1}`)
                valores.push(conta_padrao);
            }

            if (campos.length === 0) {
                return res.status(400).json({ message: 'Nenhum campo fornecido para atualizar' })
            }

            const query = `UPDATE contas SET ${campos.join(',')} WHERE id_conta = ${id_conta} RETURNING *`
            const contas = await BD.query(query, valores)

            if (contas.rows.length === 0) {
                return res.status(404).json({ message: 'Conta não encontrada' })
            }
            return res.status(200).json(contas.rows[0]);
        }
        catch (error) {
            res.status(500).json({ message: "Erro ao atualizar a conta", error: error.message })
        }
    
    }
    static async deletar(req, res) {
        const { id_conta } = req.params

        try {
            const conta = await BD.query('UPDATE conta SET ativo = false where id_conta = $1',
                [id_conta]
            )
            res.status(200).json(conta.rows[0])
        } catch (error) {
            res.status(500).json({ message: "Erro ao consultar conta", error: error.message })
        }
    }

    // Filtrar por tipo de conta
    static async filtrarConta(req,res){
        const { nome } = req.query

        try{
            const query = `
            SELECT * FROM contas
            WHERE nome = $1 and ativo = true
            ORDER BY nome DESC 
            `

            const valores = [`%${nome}$%`]

            const resposta = await BD.query(query,valores)

            return res.status(200).json(resposta.rows)
        } catch (error) {
            console.error('Erro ao filtrar conta', error);
            res.status(500).json({message: "Erro ao filtrar conta", error: error.message})
        }
    }
}

export function autenticarToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) return res.status(403).json({message: 'Token não fornecido'})

    jwt.verify(token.split(" ")[1], SECRET_KEY, (err, usuario) => {
        if(err) return res.status(403).json({message: 'Token inválido'})

        req.usuario = usuario;
        next();
    })
}

export default rotasContas;
