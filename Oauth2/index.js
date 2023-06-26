const express = require('express');
const axios = require('axios'); // Realiza requisiçoes http
require('dotenv').config(); // Carrega as variaveis de ambiente para o processo

const app = express();
const port = 3000;

// Link Login
app.get('/', (req, res) => {
  res.send('<a href="/auth/github">Login com GitHub</a>');
});

// Autenticação do Git
app.get('/auth/github', (req, res) => {
  const callback = `http://localhost:${port}/auth/github/callback`;
  const link = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${callback}`;
  res.redirect(link);
});

// Troca autorização pelo token de acesso
app.get('/auth/github/callback', async (req, res) => {
  const codigo = req.query.code;
  const restoken = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code: codigo,
  });


// Retorna informaçoes do usuario
  const acestoken = new URLSearchParams(restoken.data).get('access_token');
  const usuariores = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${acestoken}`,
    },
  });

  const usuario = usuariores.data;
  res.send(`Bem-vindo(a), ${usuario.name}!`);
});

// Inicia Servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
