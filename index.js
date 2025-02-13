import express from 'express';
import { apresentartudo, apresentarElementoId, apresentarElementoAno, apresentarElementoCampeao } from './servicos/comandosMostrar.js';
import { cadastarCampeonatos } from "./servicos/comandosCadastrarCampeonatos.js"
import { atualizarCampeonato, atualizarCampeonatoParcial } from "./servicos/comandosAtualizarCampeonatos.js"
import pool from './servicos/conexao.js';
import cors from "cors"
const app = express();

app.use(cors())

app.use(express.json())

app.patch('/campeonatos/:id', async(req, res) => {
    const {id} = req.params;
    const {campeao, vice, ano} = req.body;
    const camposAtualizar = {};

    if (campeao) camposAtualizar.campeao = campeao;
    if (vice) camposAtualizar.vice = vice;
    if (ano) camposAtualizar.ano = ano;

    if (Object.keys(camposAtualizar).length === 0) {
        res.status(400).send("Nenhum campo válido foi enviado para atualização.")
    } else {
        const resultado = await atualizarCampeonatoParcial(id, camposAtualizar)
        if (resultado.affectedRows > 0) {
            res.status(202).send("Registro atualizado com sucesso.")
        } else {
            res.status(404).send("Registro não encontrado")
        }
    }


})

app.put('/campeonatos/:id', async (req, res) => {
    const {id} = req.params;
    console.log(id)
    const {campeao, vice, ano} = req.body;
    if (campeao == undefined || vice == undefined || ano == undefined) {
        res.status(400).send("Nem todos os campos foram informados.")
    } else {
        const resultado = await atualizarCampeonato(id, campeao, vice, ano)
        if (resultado.affectedRows > 0) {
            res.status(202).send('Resgitro atualizado com sucesso.')
        } else {
            res.status(404).send('Registro não encontrato.')
        }
    }
})



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