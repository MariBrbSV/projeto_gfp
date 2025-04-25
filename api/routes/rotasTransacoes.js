import { BD } from '../db.js';

class rotasTransacoes {
    static async nova(req, res) {
        // colocar os ids ✅
        const { valor, descricao, data_transacao, id_local_transacao, id_categoria, id_subcategoria, id_usuario, data_vencimento, data_pagamento, tipo_transacao, num_parcelas, parcela_atual} = req.body;

        if (!valor || !descricao || !data_transacao || !id_local_transacao || !id_categoria || !id_subcategoria || !id_usuario || !data_vencimento || !data_pagamento || !tipo_transacao || !num_parcelas || !parcela_atual) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        try {
            const query = `INSERT INTO transacoes (valor, descricao, data_transacao, id_local_transacao, id_categoria, id_subcategoria, id_usuario, data_vencimento, data_pagamento, tipo_transacao, num_parcelas, parcela_atual) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`;
            const valores = [valor, descricao, data_transacao, id_local_transacao, id_categoria, id_subcategoria, id_usuario, data_vencimento, data_pagamento, tipo_transacao, num_parcelas, parcela_atual];
            await BD.query(query, valores);

            res.status(201).json({ message: "✅ Transações cadastrada com sucesso." });
        } catch (error) {
            console.error('Erro ao criar Transações:', error);
            res.status(500).json({ message: '❌ Erro ao criar Transações.', error: error.message });
        }
    }
}

export default rotasTransacoes;