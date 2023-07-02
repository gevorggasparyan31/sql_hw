const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'password'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connection...');
});

const app = express();
app.use(cors());

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE Homework';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('database created');
    });
});

app.get('/createtable', (req, res) => {
  let sql = 'CREATE TABLE IF NOT EXISTS Homework.students (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), age INT)';
  db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('Table created');
  });
});

app.get('/addstudent', (req, res) => {
  let student = { name: 'John Doe', age: 20 };
  let selectDbSql = 'USE Homework'; 
  let insertSql = 'INSERT INTO students SET ?';

  db.query(selectDbSql, (err) => {
    if (err) throw err;

    db.query(insertSql, student, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('Student added');
    });
  });
});
app.get('/min', (req, res) => {
  const sqlSelectDb = 'USE Homework';
  const sqlQuery = 'SELECT MIN(column_name) AS min_value FROM students';

  db.query(sqlSelectDb, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error selecting the database');
    } else {
      db.query(sqlQuery, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error executing the "min" query');
        } else {
          console.log(result[0].min_value);
          res.send(result[0].min_value.toString());
        }
      });
    }
  });
});

app.get('/max', (req, res) => {
  const sqlSelectDb = 'USE Homework';
  const sqlQuery = 'SELECT MAX(column_name) AS max_value FROM students';

  db.query(sqlSelectDb, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error selecting the database');
    } else {
      db.query(sqlQuery, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error executing the "max" query');
        } else {
          console.log(result[0].max_value);
          res.send(result[0].max_value.toString());
        }
      });
    }
  });
});

app.get('/and', (req, res) => {
  const sqlSelectDb = 'USE Homework';
  const sqlQuery = 'SELECT column1, column2 FROM students WHERE column1 = true AND column2 = false';

  db.query(sqlSelectDb, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error selecting the database');
    } else {
      db.query(sqlQuery, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error executing the "and" query');
        } else {
          console.log(result);
          res.send(JSON.stringify(result));
        }
      });
    }
  });
});

app.get('/or', (req, res) => {
  const sqlSelectDb = 'USE Homework';
  const sqlQuery = 'SELECT column1, column2 FROM students WHERE column1 = true OR column2 = false';

  db.query(sqlSelectDb, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error selecting the database');
    } else {
      db.query(sqlQuery, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error executing the "or" query');
        } else {
          console.log(result);
          res.send(JSON.stringify(result));
        }
      });
    }
  });
});

app.get('/not', (req, res) => {
  const sqlSelectDb = 'USE Homework';
  const sqlQuery = 'SELECT column1, column2 FROM students WHERE NOT column1';

  db.query(sqlSelectDb, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error selecting the database');
    } else {
      db.query(sqlQuery, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error executing the "not" query');
        } else {
          console.log(result);
          res.send(JSON.stringify(result));
        }
      });
    }
  });
});
app.get('/like', (req, res) => {
  const sqlSelectDb = 'USE Homework';
  const sqlQuery = "SELECT * FROM students WHERE name LIKE 'J%'";

  db.query(sqlSelectDb, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error selecting the database');
    } else {
      db.query(sqlQuery, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error executing the "like" query');
        } else {
          console.log(result);
          res.send(JSON.stringify(result));
        }
      });
    }
  });
});

app.get('/between', (req, res) => {
  const sqlSelectDb = 'USE Homework';
  const sqlQuery  = 'SELECT column FROM students WHERE column BETWEEN start_value AND end_value';

  db.query(sqlSelectDb, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error selecting the database');
    } else {
      db.query(sqlQuery, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error executing the "not" query');
        } else {
          console.log(result);
          res.send(JSON.stringify(result));
        }
      });
    }
  });
});

app.get('/union', (req, res) => {
  const sqlSelectDb = 'USE Homework';
  const sqlQuery = 'SELECT column1 FROM table1 UNION SELECT column2 FROM students';
  db.query(sqlSelectDb, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error selecting the database');
    } else {
      db.query(sqlQuery, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error executing the "not" query');
        } else {
          console.log(result);
          res.send(JSON.stringify(result));
        }
      });
    }
  });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});
