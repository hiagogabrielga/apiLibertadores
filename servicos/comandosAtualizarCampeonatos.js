import pool from "./conexao.js";

export async function atualizarCampeonato(id, campeao, vice, ano) {
    const conexao = await pool.getConnection();
    const query = "UPDATE campeonatos SET campeao = ?, vice = ?, ano = ? WHERE id = ?";
    const [respota] = await conexao.execute(query, [campeao, vice, ano, id]);
    console.log(respota)
    conexao.release();
    return respota;
}

export async function atualizarCampeonatoParcial(id, campos){
    const conexao = await pool.getConnection();

    const colunas = Object.keys(campos).map(campo => `${campo} = ?`).join(", ");
    const valores = Object.values(campos);

    const query = `UPDATE campeonatos SET ${colunas} WHERE id = ?` //campeao = ?, vice = ?, ...
    valores.push(id);
    console.log(valores)
    const [resposta] = await conexao.execute(query, valores);
    console.log(resposta);
    conexao.release();
    return resposta;
};