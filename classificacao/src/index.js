const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

const chavePrimaria = "INSCREVER";
const funcoes = {
    ObservacaoCriada : (observacao) => {
        observacao.status = 
            observacao.cadastro.includes(chavePrimaria) ? 
            "CPF" : "CNPJ";
        axios.post("http://localhost:7000/eventos", {
            tipo: "ObservacaoClassificada",
            dados: observacao,    
        }).catch((err) => {
            console.log("err", err);
        });
    },
};
app.post("/eventos",(req, res) => {
    try {
        functions[req.body.tipo](req.body.dados);
    }catch(err){}
    res.status(200).send({msg: "ok"});
});
app.listen(6000, () => console.log("Classificação. Porta 6000"));