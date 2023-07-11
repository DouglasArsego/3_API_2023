-Config Inicial

"npm init"

-Dependencias

"npm install express dotenv axios knex body-parser mysql"

======================= Banco de Dados ========================================

CREATE DATABASE agenda;

USE agenda;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  github_id INT UNIQUE,
  username VARCHAR(255),
  name VARCHAR(255)
);

CREATE TABLE registros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tema VARCHAR(255) NOT NULL,
  nota TEXT NOT NULL,
  data DATE NOT NULL
);