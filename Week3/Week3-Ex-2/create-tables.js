import mysql from "mysql";

//create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week3DB",
  multipleStatements: true,
});

//connect
db.connect((err) => {
  if (err) throw err;
  console.log("MySql Connected...");
});

//create DB
db.query(
  "DROP DATABASE week3DB; CREATE DATABASE week3DB; USE week3DB",
  (err, result) => {
    if (err) throw err;
    console.log(result);
  }
);

const createAccount = `
CREATE TABLE IF NOT EXISTS accounts (
    account_number VARCHAR(20) NOT NULL PRIMARY KEY,
    balance DECIMAL(10, 2) NOT NULL,
    CHECK (balance >= 0)
  );  
`;

db.query(createAccount, (error, result) => {
  if (error) throw error;
  else {
    console.log(`Table accounts is created`);
  }
});

const createAccountChanges = `
CREATE TABLE IF NOT EXISTS account_changes (
    change_number INT AUTO_INCREMENT PRIMARY KEY,
    account_number VARCHAR(20) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    changed_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    remark VARCHAR(255),
    FOREIGN KEY (account_number) REFERENCES accounts(account_number)
  );
  `;

db.query(createAccountChanges, (error, result) => {
  if (error) throw error;
  else {
    console.log(`Table accounts_changes is created`);
  }
});

db.end();
