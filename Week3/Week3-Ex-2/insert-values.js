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

//USE DB
db.query("USE week3DB;", (err, result) => {
  if (err) throw err;
  console.log(result);
});

const dataAccounts = [
  ["acc101", 10000.0],
  ["acc102", 20000.0],
  ["acc103", 30000.0],
  ["acc104", 40000.0],
  ["acc105", 50000.0],
];

db.query(
  "INSERT INTO accounts (account_number, balance) VALUES ?",
  [dataAccounts],
  (error, result) => {
    if (error) throw error;
    else {
      console.log(`Accounts added to the table`);
    }
  }
);

db.end();
