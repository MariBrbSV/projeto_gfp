import { BD } from '../db.js';

class rotasTransacoes {
    static async nova(req, res) {
        // colocar os ids ✅
        const { valor, descricao, data_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, data_vencimento, data_pagamento, tipo_transacao, num_parcelas, parcela_atual} = req.body;

        if (!valor || !descricao || !data_transacao || !id_conta || !id_categoria || !id_subcategoria || !id_usuario || !data_vencimento || !data_pagamento || !tipo_transacao || !num_parcelas || !parcela_atual) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        try {
            const query = `INSERT INTO transacoes (valor, descricao, data_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, data_vencimento, data_pagamento, tipo_transacao, num_parcelas, parcela_atual) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;
            const valores = [valor, descricao, data_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, data_vencimento, data_pagamento, tipo_transacao, num_parcelas, parcela_atual];
            await BD.query(query, valores);

            res.status(201).json({ message: "✅ Transações cadastrada com sucesso." });
        } catch (error) {
            console.error('Erro ao criar Transações:', error);
            res.status(500).json({ message: '❌ Erro ao criar Transações.', error: error.message });
        }
    }

    // Criar uma rota que permite filtrar transações por data de vencimento ou data de pagamento dentro de um intervalo específico
    static async filtrarPorData(req,res){
        const { data_inicio, data_fim, tipo_data } = req.query;
        let colunaData;
        if(tipo_data == 'vencimento'){
            colunaData = 'data_vencimento'
        }
        else if(tipo_data == 'pagamento'){
            colunaData = 'data_pagamento'
        }
        else{
            return res.status(400).json({
                message: "Tipo_data inválido, use vencimento ou pagamento"
            })
        }
        try{
            const query = `
                SELECT t.*, u.nome AS nome_usuario, ct.nome
                FROM transacoes AS t
                LEFT JOIN usuarios AS u ON t.id_usuario = u.id_usuario
                JOIN contas ct ON t.id_conta = ct.id_conta
                WHERE ${colunaData} BETWEEN $1 AND $2
                ORDER BY ${colunaData} ASC
            `

            const transacoes = await BD.query(query, [data_inicio, data_fim])

            res.status(200).json(transacoes.rows);
        } catch (error){
            console.error('Erro ao filtrar Transações:', error);
            res.status(500).json({ message: '❌ Erro ao filtrar Transações.', error: error.message });
        }
    }

    // Somando transações de entrada ou saída
    static async somarTransacoes(req,res){
        const { tipo, id_usuario } = req.query;
        try{
            const tipoTransacao = tipo.toUpperCase();
            const query = `
                    SELECT SUM(valor) AS total 
                    FROM transacoes
                    WHERE tipo_transacao = $1 AND id_usuario = $2
                `

                const resultado = await BD.query(query, [tipoTransacao, id_usuario])

                let total = resultado.rows[0].total
                if(total === null)
                {
                    total = 0
                }
                res.status(200).json({total: parseFloat(total)})

        } catch (error) {
            console.error('Erro ao somar transação', error);
            res.status(500).json({ message: '❌ Erro ao somar transação.', error: error.message });
        }
    }

    static async transacoesVencidas(req,res){
        const { id_usuario } = req.params;

        try {
            const query = `
            SELECT t.valor, t.data_transacao, t.data_vencimento, t.data_pagamento,
            u.nome AS nome_usuario,
            c.nome AS nome_conta,
            ct.nome AS nome_categoria,
            sct.nome AS nome_subcategoria
            FROM transacoes AS t
            LEFT JOIN usuarios u ON t.id_usuario = u.id_usuario
            LEFT JOIN contas c ON t.id_conta = c.id_conta
            LEFT JOIN categorias ct ON t.id_categoria = ct.id_categoria
            LEFT JOIN subcategorias sct ON t.id_subcategoria = sct.id_subcategoria
            WHERE t.data_vencimento < CURRENT_DATE -- filtra transações vencidas
            AND t.id_usuario = $1
            ORDER BY t.data_vencimento ASC
            `

            const resultado = await BD.query(query, [id_usuario])

            // Função para formatar data
            const formatarDataBr = (data) => {
                if(!data) return null;
                return new Date(data).toLocaleDateString('pt-BR') // Converte a data no padrão BR
            }

            const dadosFormatados = resultado.rows.map(t =>({
                ...t, // Copia todas as propriedades originais do resultado para a t
                data_transacao: formatarDataBr(t.data_transacao),
                data_vencimento: formatarDataBr(t.data_vencimento),
                data_pagamento: formatarDataBr(t.data_pagamento),
            }))
            res.status(200).json(dadosFormatados)
        } catch (error){
            console.error('Erro ao buscar transações vencidas', error);
            res.status(500).json({ message: '❌ Erro ao buscar transações vencidas.', error: error.message });
        }
    }
}

export default rotasTransacoes;