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

//Create Table research_Papers
db.query(
  `CREATE TABLE IF NOT EXISTS research_Papers (
    paper_id INT AUTO_INCREMENT,
    paper_title VARCHAR(300),
    conference VARCHAR(300),
    publish_date DATE,
    PRIMARY KEY(paper_id))
    ENGINE=InnoDB;`,
  (err, result) => {
    if (err) throw err;
    console.log(result);
    console.log("research_Papers table created...");
  }
);

//Create Table researches
db.query(
  `CREATE TABLE IF NOT EXISTS researches (
    research_id INT AUTO_INCREMENT,
    research_paper_id INT,
    research_author_id INT,
    PRIMARY KEY(research_id),
    FOREIGN KEY(research_paper_id) REFERENCES research_Papers(paper_id),
    FOREIGN KEY(research_author_id) REFERENCES authors(author_id)
  );`,
  (err, result) => {
    if (err) throw err;
    console.log(result);
    console.log("research_Papers table created...");
  }
);

// Insert data into authors
const authors = [
  ["AuthorA", "UniversityA", "1999-01-11", 53, "Female", null],
  ["AuthorB", "UniversityB", "1999-02-12", 44, "Male", 1],
  ["AuthorC", "UniversityA", "1999-03-13", 75, "Female", 2],
  ["AuthorD", "UniversityD", "1999-04-14", 26, "Female", null],
  ["AuthorE", "UniversityD", "1999-05-15", 47, "Male", 4],
  ["AuthorF", "UniversityF", "1999-06-16", 68, "Female", 1],
  ["AuthorG", "UniversityG", "1999-07-17", 89, "Male", 2],
  ["AuthorH", "UniversityB", "1999-08-18", 92, "Male", 6],
  ["AuthorI", "UniversityC", "1999-09-19", 11, "Female", 8],
  ["AuthorJ", "UniversityF", "1999-10-20", 92, "Male", 9],
];

db.query(
  "SET FOREIGN_KEY_CHECKS=0; TRUNCATE TABLE authors; INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor) VALUES ?",
  [authors],
  (error, result) => {
    if (error) throw error;
    else {
      console.log(`Authors added to the table`);
    }
  }
);

// Insert data into research_Papers
const researchPapers = [
  ["StudyA", "ConferenceA", "1999-01-01"],
  ["StudyB", "ConferenceB", "1999-02-01"],
  ["StudyC", "ConferenceC", "1999-03-01"],
  ["StudyD", "ConferenceD", "1999-04-01"],
  ["StudyE", "ConferenceE", "1999-05-01"],
  ["StudyF", "ConferenceF", "1999-06-01"],
  ["StudyG", "ConferenceG", "1999-07-01"],
  ["StudyH", "ConferenceH", "1999-08-01"],
  ["StudyI", "ConferenceI", "1999-09-01"],
  ["StudyJ", "ConferenceJ", "1999-10-01"],
];

db.query(
  "SET FOREIGN_KEY_CHECKS=0; TRUNCATE TABLE research_Papers; INSERT INTO research_Papers (paper_title, conference, publish_date) VALUES ?",
  [researchPapers],
  (error, result) => {
    if (error) throw error;
    else {
      console.log(`Research papers added to the table`);
    }
  }
);

// Insert data into researches
const AuthorsOfPapers = [
  [1, 2],
  [2, 3],
  [3, 7],
  [1, 1],
  [3, 9],
  [5, 1],
  [5, 7],
  [6, 8],
  [6, 9],
  [9, 2],
];

db.query(
  "SET FOREIGN_KEY_CHECKS=0; TRUNCATE TABLE researches; INSERT INTO researches (research_paper_id, research_author_id) VALUES ?",
  [AuthorsOfPapers],
  (error, result) => {
    if (error) throw error;
    else {
      console.log(`Authors of papers added to the table`);
    }
  }
);

db.end();
