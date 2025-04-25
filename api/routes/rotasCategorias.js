import { BD } from '../db.js';

class rotasCategorias {
    static async nova(req, res) {
        const { nome, tipo_transacao, id_usuario, gasto_fixo } = req.body;

        if (!nome || !tipo_transacao || !gasto_fixo || !id_usuario) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        // Validação de tipo_transacao
        const tiposValidos = ['ENTRADA', 'SAIDA'];
        if (!tiposValidos.includes(tipo_transacao)) {
            return res.status(400).json({ message: 'O tipo_transacao deve ser "entrada" ou "saida".' });
        } 

        try {
            const query = `INSERT INTO categorias (nome, tipo_transacao, gasto_fixo, id_usuario) VALUES($1, $2, $3, $4)`;
            const valores = [nome, tipo_transacao, gasto_fixo, id_usuario];
            await BD.query(query, valores);

            res.status(201).json({ message: "✅ Categoria cadastrada com sucesso." });
        } catch (error) {
            console.error('Erro ao criar categoria:', error);
            res.status(500).json({ message: '❌ Erro ao criar categoria.', error: error.message });
        }
    }

    // Filtrar por tipo de categoria
    static async filtrarCategoria(req,res){
        // O valor será enviado por parâmetro na url, deve ser enviado dessa maneira
        // ?tipo_transacao = entrada
        const { tipo_transacao } = req.query

        try{
            const filtros = [];
            const valores = [];

            if(tipo_transacao){
                filtros.push(`tipo_transacao = $${valores.lenght + 1}`);
                valores.push(tipo_transacao);
            }
            const query = `
            SELECT * FROM categorias
            ${filtros.lenght ? `WHERE ${filtros.join(" AND ")} ` : "" } and ativo = true
            ORDER BY id_categoria DESC 
            `

            const resultado = await BD.query(query,valores)
        } catch (error) {

        }
    }

    // // ------------------------------------------------
    // static async listarCategorias(req, res) {
    //     try {
    //         const categorias = await BD.query('SELECT * FROM categorias');
    //         return res.status(200).json(categorias.rows);
    //     } catch (error) {
    //         console.error('Erro ao listar categorias:', error);
    //         res.status(500).json({ message: 'Erro ao listar as categorias.', error: error.message });
    //     }
    // }

    // // ------------------------------------------------

    // static async listarCategoriasPorID(req,res){
    //     const {id_categoria} = req.params;
    //     try{
    //         const categoria = await BD.query('SELECT * FROM categorias WHERE id_categoria = $1', [id_categoria]);
    //         res.status(200).json(categoria.rows);
    //     } catch(error){
    //         res.status(500).json({message:
    //             "Erro ao consultar a categoria", error: error.message})
    //     }
    // }

    // // ------------------------------------------------
    // static async deletarCategoria(req, res) {
    //     const { id_categoria } = req.params;

    //     if (!id_categoria) {
    //         return res.status(400).json({ message: 'ID da categoria é obrigatório.' });
    //     }

    //     try {
    //         const resultado = await BD.query('UPDATE categorias SET ativo = false WHERE id_categoria = $1 RETURNING *', [id_categoria]);

    //         if (resultado.rowCount === 0) {
    //             return res.status(404).json({ message: 'Categoria não encontrada.' });
    //         }

    //         return res.status(200).json({ message: "✅ Categoria inativada com sucesso." });
    //     } catch (error) {
    //         console.error('Erro ao deletar categoria:', error);
    //         res.status(500).json({ message: "Erro ao deletar categoria.", error: error.message });
    //     }
    // }

    // // ------------------------------------------------
    //     static async atualizar(req, res) {
    //         const { id_categoria } = req.params;
    //         const { nome, tipo_transacao, gasto_fixo } = req.body;
    
    //         if (!id_categoria) {
    //             return res.status(400).json({ message: 'ID da categoria é obrigatório.' });
    //         }
    
    //         try {
    //             const campos = [];
    //             const valores = [];
    
    //             if (nome) {
    //                 campos.push(`nome = $${valores.length + 1}`);
    //                 valores.push(nome);
    //             }
    
    //             if (tipo_transacao) {
    //                 campos.push(`tipo_transacao = $${valores.length + 1}`);
    //                 valores.push(tipo_transacao);
    //             }
    
    //             if (gasto_fixo) {
    //                 campos.push(`gasto_fixo = $${valores.length + 1}`);
    //                 valores.push(gasto_fixo);
    //             }
    

    //             if (campos.length === 0) {
    //                 return res.status(400).json({ message: 'Nenhum campo fornecido para atualização.' });
    //             }
    
    //             valores.push(id_categoria);
    
    //             const query = `UPDATE categorias SET ${campos.join(', ')} WHERE id_categoria = $${valores.length} RETURNING *`;
    //             const resultado = await BD.query(query, valores);
    
    //             if (resultado.rowCount === 0) {
    //                 return res.status(404).json({ message: 'Categoria não encontrada.' });
    //             }
    
    //             return res.status(200).json(resultado.rows[0]);
    //         } catch (error) {
    //             console.error('Erro ao atualizar categoria:', error);
    //             res.status(500).json({ message: "Erro ao atualizar a categoria.", error: error.message });
    //         }
    //     }

    //     // ------------------------------------------------

    // static async atualizarTodosCategoria(req, res){
    //     try{
    //         const categorias = await BD.query('SELECT * FROM categorias');
    //         return res.status(200).json(categorias.rows); 
    //     }catch(error){
    //         res.status(500).json({message: 
    //             'Erro ao listar as categorias', error: error.message})
    //     }
    // }
}

export default rotasCategorias;
