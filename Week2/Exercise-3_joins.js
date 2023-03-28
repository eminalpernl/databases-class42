import mysql from "mysql";

//create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week2DB",
  multipleStatements: true,
});

//connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected...");
});

// authors and their mentors.
const authorsAndMentors = `
SELECT authors.author_name, x.author_name AS mentor
FROM authors
LEFT JOIN authors x
ON authors.mentor = x.author_id
WHERE authors.mentor;
`;

db.query(authorsAndMentors, (error, result) => {
  if (error) throw error;
  else {
    console.table(result);
  }
});

// authors and their published paper_title.
const authorsAndPapers = `
SELECT authors.author_name, research_Papers.paper_title
FROM authors
LEFT JOIN researches ON authors.author_id = researches.research_author_id
LEFT JOIN research_Papers ON researches.research_paper_id = research_Papers.paper_id;
`;

db.query(authorsAndPapers, (error, result) => {
  if (error) throw error;
  else {
    console.table(result);
  }
});

db.end();
