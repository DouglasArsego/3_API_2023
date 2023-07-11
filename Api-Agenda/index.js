const express = require('express');
const axios = require('axios');
const mysql = require('mysql');
const knex = require('knex');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;

// Configuração da conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'agenda',
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão bem-sucedida ao banco de dados!');
  }
});

// // Configuração da conexão com o banco de dados MySQL pelo knex 
const db = knex({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'agenda',
  },
});

// Rota de login
app.get('/', (req, res) => {
  res.send('<a href="/auth/github">Login com GitHub</a>');
});

// Rota de autenticação do GitHub
app.get('/auth/github', (req, res) => {
  const callbackURL = `http://localhost:${port}/auth/github/callback`;
  const authURL = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${callbackURL}`;
  res.redirect(authURL);
});

// Rota de callback após a autenticação no GitHub
app.get('/auth/github/callback', async (req, res) => {
  const code = req.query.code;

  try {
    // Troca o código de autorização pelo token de acesso
    const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: code,
    }, {
      headers: {
        Accept: 'application/json'
      }
    });

    const accessToken = tokenResponse.data.access_token;

    // Obtém informações do usuário autenticado
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const userData = userResponse.data;
    const username = userData.login;
    const name = userData.name || userData.login;

    // Verifica se o usuário existe no banco de dados
    connection.query('SELECT * FROM users WHERE github_id = ?', [userData.id], (err, results) => {
      if (err) {
        console.error('Erro ao executar consulta no banco de dados:', err);
        res.status(500).send('Erro ao executar consulta no banco de dados');
      } else {
        if (results.length > 0) {
          // Usuário encontrado no banco de dados
          const user = results[0];
          res.redirect('/index.html'); // Redirecionar para a página index.html
        } else {
          // Usuário não encontrado no banco de dados, insere novo usuário
          const newUser = {
            github_id: userData.id,
            username: username,
            name: name
          };
    
          connection.query('INSERT INTO users SET ?', newUser, (err, result) => {
            if (err) {
              console.error('Erro ao inserir novo usuário no banco de dados:', err);
              res.status(500).send('Erro ao inserir novo usuário no banco de dados');
            } else {
              console.log('Novo usuário inserido no banco de dados:', result);
              res.redirect('/index.html'); // Redirecionar para a página index.html
            }
          });
        }
      }
    });
  } catch (error) {
    console.error('Erro durante a autenticação do GitHub:', error);
    res.status(500).send('Erro durante a autenticação do GitHub');
  }
});

// Mostar registros
app.get('/registros', (req, res) => {
  connection.query('SELECT * FROM registros', (err, results) => {
    if (err) {
      console.error('Erro ao recuperar registros do banco de dados:', err);
      res.status(500).send('Erro ao recuperar registros do banco de dados');
    } else {
      console.log('Registros recuperados do banco de dados:', results);
      res.send(results);
    }
  });
});


app.use(bodyParser.json()); // Analisar o corpo da solicitação

// Registra tabela
app.post('/registros', (req, res) => {
  const { tema, nota, data } = req.body;

  db('registros')
    .insert({ tema, nota, data })
    .then(() => {
      res.send('Informações adicionadas com sucesso');
    })
    .catch((error) => {
      console.error('Erro ao adicionar informações:', error);
      res.status(500).send('Erro ao adicionar informações');
    });
})

// Edita tabela
app.put('/registros/:id', (req, res) => {
  const { tema, nota, data } = req.body;
  const { id } = req.params;

  db('registros')
    .where({ id: id })
    .update({ tema, nota, data })
    .then(() => {
      res.send('Registro atualizado com sucesso');
    })
    .catch((error) => {
      console.error('Erro ao atualizar registro:', error);
      res.status(500).send('Erro ao atualizar registro');
    });
});

// Deleta tabela
app.delete('/registros/:id', (req, res) => {
  const { id } = req.params;

  db('registros')
    .where({ id: id })
    .del()
    .then(() => {
      res.send('Registro excluído com sucesso');
    })
    .catch((error) => {
      console.error('Erro ao excluir registro:', error);
      res.status(500).send('Erro ao excluir registro');
    });
});


//Express para servir arquivos estáticos (abrir html no navegador)
app.use(express.static(path.join(__dirname, 'public')));


// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
