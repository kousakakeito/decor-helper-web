const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost:3306',
  user: 'root',
  password: '0627ikik',
  database: 'decorhelper',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database!');
});

const createUsersTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      PRIMARY KEY (username)
    )
  `;

  connection.query(sql, (err) => {
    if (err) {
      console.error('Error creating users table:', err);
      return;
    }
    console.log('Users table created successfully!');
  });
};

createUsersTable();

app.use(express.urlencoded({ extended: true }));

app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  const sql = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
  const values = [username, password, email];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return;
    }
    console.log('User registered successfully!');
    res.redirect('/App/home.html');
  });
});


