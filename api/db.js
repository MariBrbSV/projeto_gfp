import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;
dotenv.config();

const BD = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'bd_gfp',
    password: 'admin',
    port: 5432,
});

const testarConexao = async () => {
    try {
        const client = await BD.connect();
        console.log("✅ Conexão com o banco de dados estabelecida.");
        client.release();
    } catch (error) {
        console.error("❌ Erro ao conectar ao banco de dados:", error.message);
        process.exit(1); // Encerra o processo se a conexão falhar
    }
};

export { BD, testarConexao };