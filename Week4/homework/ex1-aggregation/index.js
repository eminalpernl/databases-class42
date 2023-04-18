import { MongoClient } from "mongodb";
import readCSV from "csvtojson";
import * as dotenv from "dotenv";
dotenv.config();
const URI = process.env.MONGODB_URL;

async function main() {
  const client = await MongoClient.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const CSV = await readCSV()
    .fromFile("population_pyramid_1950-2022.csv")
    .then(async (arr) => {
      const modifyArray = arr.map((item) => {
        return {
          Country: item.Country,
          Year: parseInt(item.Year),
          Age: item.Age,
          M: parseInt(item.M),
          F: parseInt(item.F),
        };
      });

      await insertCSV(client, modifyArray);
    });

  await population(client, "Netherlands");

  await findByAgeAndYear(client, "10-14", 2010);

  await dropCollection(client, "countries");

  client.close();
}

main().catch(console.error);

async function insertCSV(client, arr) {
  const result = await client
    .db("databaseWeek4")
    .collection("countries")
    .insertMany(arr);
  console.log(`${result.insertedCount} new listing(s) created`);
}

async function population(client, country) {
  const pipeline = [
    {
      $match: {
        Country: country,
      },
    },
    {
      $group: {
        _id: "$Year",
        countPopulation: {
          $sum: {
            $add: ["$M", "$F"],
          },
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ];

  const aggCursor = await client
    .db("databaseWeek4")
    .collection("countries")
    .aggregate(pipeline);

  await aggCursor.forEach((element) => {
    console.log(
      `_id:${element._id}, countPopulation: ${element.countPopulation}`
    );
  });
}

// drop collection

async function dropCollection(client, collectionName) {
  await client
    .db("databaseWeek4")
    .dropCollection(collectionName, (err, result) => {
      if (err) throw err;

      if (result) console.log("Collection deleted");
    });
}

// Ex-1.3

async function findByAgeAndYear(client, age, year) {
  const pipeline = [
    {
      $match: {
        Country: {
          $in: [
            "ASIA",
            "AFRICA",
            "EUROPE",
            "LATIN AMERICA AND THE CARIBBEAN",
            "NORTHERN AMERICA",
            "OCEANIA",
          ],
        },
        Year: year,
        Age: age,
      },
    },
    {
      $addFields: {
        TotalPopulation: {
          $sum: {
            $add: ["$M", "$F"],
          },
        },
      },
    },
  ];

  const aggCursor = await client
    .db("databaseWeek4")
    .collection("countries")
    .aggregate(pipeline);
  const result = await aggCursor.toArray();

  console.log(result);
}
