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

const transactionQuery = `
START TRANSACTION;
UPDATE accounts
SET balance = balance - 1000.00
WHERE account_number = 'acc101';
UPDATE accounts
SET balance = balance + 1000.00
WHERE account_number = 'acc102';
INSERT INTO account_changes (account_number, amount, remark)
VALUES
  ('acc101', -1000.00, ' Transfered to acc102'),
  ('acc102', 1000.00, 'Transfered from acc101');
SELECT @@autocommit;
COMMIT;
ROLLBACK;
`;

db.query(transactionQuery, (error, result) => {
  if (error) {
    console.log("Transaction was not successful");
    throw error;
  } else {
    console.log(`Transaction was successful`);
  }
});

db.end();
