import pool from "./conexao.js";

export async function deletarCampeonato(id) {
    const conexao = await pool.getConnection()
    const query = `DELETE FROM campeonatos WHERE id = ?`
    let [resposta]  = await conexao.execute(query, [id]);
    console.log(resposta)
    conexao.release()
    return resposta
}