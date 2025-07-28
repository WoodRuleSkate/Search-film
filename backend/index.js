const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

// Налаштування з'єднання з БД
const db = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'cineflix'
});

// API — отримати всі фільми
app.get('/films', (req, res) => {
  db.query('SELECT * FROM films', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// API — отримати всі сеанси (із назвою фільму)
app.get('/seances', (req, res) => {
  db.query('SELECT seances.*, films.title FROM seances JOIN films ON seances.film_id = films.id', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Запуск сервера
app.listen(3001, () => {
  console.log('Backend is running on http://localhost:3001');
});