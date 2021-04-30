const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");
const observacoesPorLojistaId = {};

const {
    v4:uuidv4
} = require("uuid");

const funcoes = {
    ObservacaoClassificada : (observacao) => {
        const observacoes = 
            observacoesPorLojistaId[observacao.lojistaId];
        const obsParaAtualizar = observacoes.status;
        axios.post("http://localhost:7000/eventos", {
            tipo: "ObservacaoAtualizada",
            dados: {
                id: observacao.id,
                lojista: observacao.lojista,
                lojistaId: observacao.lojistaId,
                status: observacao.status
            } 
        }).catch((err) => {
            console.log("err", err);
        });
    } 
} 

app.post("/eventos", (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);
    }catch(err){}
    res.status(200).send({msg:"ok"});
});

app.put("/lojas/:id/observacoes", async(req, res) => {
    const idObs = uuidv4();
    const {
        cadastro : [
            {
            
            INSCRICAO: [INSCRICAO],
            Idade: Idade,
            Telefone: Telefone,
            Email: Email,
            razaoSocial: razaoSocial,
            Endereco: Endereco,
            Numero: Numero,
            CEP: CEP,
            }
        ],
    } = req.body;
    const observacoesDasLojas =
        observacoesPorLojasId [req.params.id] || [];
        observacoesDasLojas.push({
            id: idObs,
            cadastro ,
            status: "aguardando"
    });
        observacoesPorLojasId[req.params.id] = 
        observacoesDasLojas;
    
    await axios.post("http://localhost:7000/eventos", {
        tipo: "ObservacaoCriada",
        dados: {
            id: idObs,
            cadastro,
            lojasId: req.params.id, 
            status: "aguardando"

        }
    })
    res.status(201).send(observacoesDoLojista);
}); //app.put()
app.get("/lojas/:id/observacoes", (req, res) => {
    res.send(observacoesPorLojasId[req.params.id] || []);
});
app.listen(4000, (() => {
    console.log("Lojas. Porta 4000");
}));
