import mysql from "mysql";

//create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  multipleStatements: true,
});

//connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected...");
});

//create DB
db.query("DROP DATABASE week2DB; CREATE DATABASE week2DB", (err, result) => {
  if (err) throw err;
  console.log(result);
});

// use db
db.query("USE week2DB", (err, result) => {
  if (err) throw err;
  console.log(result);
  console.log("connected to db");
});

// create table
db.query(
  `CREATE TABLE authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    author_name VARCHAR(50),
    university VARCHAR(100),
    date_of_birth DATE,
    h_index INT,
    gender VARCHAR(10))
  ;`,
  (err, result) => {
    if (err) throw err;
    console.log(result);
    console.log("authors table created...");
  }
);

// alter table
db.query(
  `ALTER TABLE authors
    ADD COLUMN mentor INT,
    ADD CONSTRAINT users_fk
    FOREIGN KEY (mentor)
    REFERENCES authors(author_id);`,
  (err, result) => {
    if (err) throw err;
    console.log(result);
    console.log("authors table created...");
  }
);

db.end();
