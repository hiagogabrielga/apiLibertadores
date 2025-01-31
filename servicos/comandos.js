import pool from "./conexao.js";

async function apresentartudo() {
    const conexao = await pool.getConnection()
    const query = "SELECT * FROM campeonatos"
    let resposta_campeonatos = await conexao.query(query);
    let resposta = resposta_campeonatos[0]
    conexao.release()
    return resposta
}

async function executarQuery(conexao, query) {
    let resposta_campeonatos = await conexao.query(query);
    let resposta = resposta_campeonatos[0]
    return resposta
}

async function apresentarElementoId(id) {
    const conexao = await pool.getConnection()
    const query = `SELECT id, campeao, vice, ano FROM campeonatos WHERE id = ${id}`
    let resposta = executarQuery(conexao, query)
    conexao.release()
    return resposta
}

async function apresentarElementoAno(ano) {
    const conexao = await pool.getConnection()
    const query = `SELECT id, campeao, vice, ano FROM campeonatos WHERE ano = ${ano}`
    let resposta = executarQuery(conexao, query)
    conexao.release()
    return resposta
}

async function apresentarElementoCampeao(time) {
    const conexao = await pool.getConnection()
    const query = `SELECT id, campeao, vice, ano FROM campeonatos WHERE campeao = "${time}"`
    let resposta = executarQuery(conexao, query)
    conexao.release()
    return resposta
}

export { apresentartudo, apresentarElementoId, apresentarElementoAno, apresentarElementoCampeao }