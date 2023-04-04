import mysql from "mysql";
const conn = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
  multipleStatements: true,
});

conn.connect();

function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].name);
    }
  );
}

// Example Injection for fetching all data:
getPopulation("country", "' OR '1'='1", "' OR '1'='1", console.log);

// Escaping Injection
function getPopulationEscaped(Country, countryName, countryCode, cb) {
  const name = conn.escape(countryName);
  const code = conn.escape(countryCode);
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = ${name} and code = ${code};`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(result);
    }
  );
}
