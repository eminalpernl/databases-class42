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
  console.table("MySql Connected...");
});

// All research papers and the number of authors that wrote that paper.
const papersQuantity = `
SELECT research_Papers.paper_title, COUNT(researches.research_author_id) AS Quantity
FROM research_Papers
LEFT JOIN researches ON research_Papers.paper_id = researches.research_paper_id
GROUP BY paper_title;
`;

db.query(papersQuantity, (error, result) => {
  if (error) throw error;
  else {
    console.table(result);
  }
});

//Sum of the research papers published by all female authors.
const femalePapers = `
SELECT COUNT(research_Papers.paper_title) AS Number_of_papers
FROM research_Papers
LEFT JOIN researches ON research_Papers.paper_id = researches.research_paper_id
LEFT JOIN authors ON researches.research_author_id = authors.author_id
WHERE authors.gender = "Female";
`;

db.query(femalePapers, (error, result) => {
  if (error) throw error;
  else {
    console.table(result);
  }
});

// Average of the h-index of all authors per university
const averageIndex = `
SELECT university, AVG(h_index)
FROM authors
GROUP BY university
`;

db.query(averageIndex, (error, result) => {
  if (error) throw error;
  else {
    console.table(result);
  }
});

//Sum of the research papers of the authors per university.
const SumOfPapers = `
SELECT authors.university, COUNT(researches.research_paper_id) AS total_papers
FROM authors
LEFT JOIN researches ON researches.research_author_id = authors.author_id
GROUP BY authors.university;
`;
db.query(SumOfPapers, (error, result) => {
  if (error) throw error;
  else {
    console.table(result);
  }
});

//Minimum and maximum of the h-index of all authors per university
const minAndMax = `
SELECT university, MIN(h_index), MAX(h_index)
FROM authors
GROUP BY university
`;

db.query(minAndMax, (error, result) => {
  if (error) throw error;
  else {
    console.table(result);
  }
});

db.end();
