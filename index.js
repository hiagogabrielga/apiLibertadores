import express from 'express';
import { apresentartudo, apresentarElementoId, apresentarElementoAno, apresentarElementoCampeao } from './servicos/comandosMostrar.js';
import { cadastarCampeonatos } from "./servicos/comandosCadastrarCampeonatos.js"
import pool from './servicos/conexao.js';
const app = express();

app.use(express.json())

app.post('/campeonatos', async (req, res) => {
    const campeao = req.body.campeao
    const vice = req.body.vice
    const ano = req.body.ano
    await cadastarCampeonatos(campeao, vice, ano)
    res.status(204).send({"Mensagem": "Cadastro efetivo com sucesso!"});
})


app.get('/campeonatos', async (req, res) => {
    const ano = req.query.ano;
    const time = req.query.time;
    let resposta;
    if (typeof ano === 'undefined' && typeof time === 'undefined') {
        resposta = await apresentartudo()
    } else if (typeof ano !== 'undefined') {
        resposta = await apresentarElementoAno(parseInt(ano))
    } else if (typeof time !== 'undefined') {
        resposta = await apresentarElementoCampeao(time)
    }
    if (resposta.length > 0) {
        res.json(resposta)
    } else {
        res.status(404).json({ mensagem: "Nenhum campeonato encontrado" })
    }
})

app.get('/campeonatos/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const resposta = await apresentarElementoId(id)
    if (resposta.length > 0) {
        res.json(resposta)
    } else {
        res.status(404).json({ mensagem: "Nenhum campeonato encontrado" })
    }

})

app.listen(9000, async () => {
    const data = new Date()
    console.log("Servidor iniciado na porta 9000", data);

    const conexao = await pool.getConnection();
    console.log(conexao.threadId);
    conexao.release();

})