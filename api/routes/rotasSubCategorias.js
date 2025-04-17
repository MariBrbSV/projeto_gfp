import { BD } from '../db.js';

class rotasSubCategorias {
    static async nova(req, res) {
        const { nome, id_categoria, gasto_fixo } = req.body;

        if (!nome || !gasto_fixo || !id_categoria) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }


        try {
            const query = `INSERT INTO subcategorias (nome, id_categoria, gasto_fixo) VALUES($1, $2, $3)`;
            const valores = [nome, id_categoria, gasto_fixo];
            await BD.query(query, valores);

            res.status(201).json({ message: "✅ SubCategoria cadastrada com sucesso." });
        } catch (error) {
            console.error('Erro ao criar subCategoria:', error);
            res.status(500).json({ message: '❌ Erro ao criar subCategoria.', error: error.message });
        }
    }

    // ------------------------------------------------
    static async deletarSubCategoria(req, res) {
        const { id_subcategoria } = req.params;

        if (!id_subcategoria) {
            return res.status(400).json({ message: 'ID da sub-categoria é obrigatório.' });
        }

        try {
            const resultado = await BD.query('UPDATE subcategorias SET ativo = false WHERE id_subcategoria = $1 RETURNING *', [id_subcategoria]);

            if (resultado.rowCount === 0) {
                return res.status(404).json({ message: 'Sub-Categoria não encontrada.' });
            }

            return res.status(200).json({ message: "✅ Sub-Categoria inativada com sucesso." });
        } catch (error) {
            console.error('Erro ao deletar sub-categoria:', error);
            res.status(500).json({ message: "Erro ao deletar sub-categoria.", error: error.message });
        }
    }

    // ------------------------------------------------
    static async listarSubCategorias(req, res) {
        try {
            const subCategorias = await BD.query('SELECT * FROM subcategorias');
            return res.status(200).json(subCategorias.rows);
        } catch (error) {
            console.error('Erro ao listar SubCategorias:', error);
            res.status(500).json({ message: 'Erro ao listar as SubCategorias.', error: error.message });
        }
    }

    // ------------------------------------------------

    static async listarSubCategoriasPorID(req, res) {
        const { id_categoria } = req.params;
    
        if (!id_categoria) {
            return res.status(400).json({ message: 'O ID da categoria é obrigatório.' });
        }
    
        try {
            const subCategoria = await BD.query('SELECT * FROM subcategorias WHERE id_categoria = $1', [id_categoria]);
    
            if (subCategoria.rows.length === 0) {
                return res.status(404).json({ message: 'Nenhuma subcategoria encontrada para esta categoria.' });
            }
    
            res.status(200).json(subCategoria.rows);
        } catch (error) {
            console.error('Erro ao consultar a SubCategoria:', error);
            res.status(500).json({ message: 'Erro ao consultar a SubCategoria.', error: error.message });
        }
    }
}

export default rotasSubCategorias;