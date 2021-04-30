const express = require('express');
const app = express();
app.use(express.json());
const axios = require("axios");

const lojas = {};
contador = 0;
app.get('/lojas', (req, res) => {
    res.send(lembretes);
});
app.put('/lojas', async(req, res) => {
    contador++;
    const {
        texto
    } = req.body;
    lojas[contador] = {
        contador,
        texto
    }
    await axios.post("localhost:7000/eventos", {
        tipo: "LojasCriado",
        dados: {
            contador,
            texto,
        },
    });
    res.status(201).send(lojas[contador]);
});
app.listen(3000, () => {
    console.log('Lojas. Porta 3000');
});