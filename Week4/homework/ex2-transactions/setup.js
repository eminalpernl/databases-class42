import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();
const URI = process.env.MONGODB_URL;

export const addData = async function () {
  const client = new MongoClient(URI, { useUnifiedTopology: true });

  const dataAccounts = [
    {
      account_number: "101",
      balance: 5000,
      account_changes: [
        {
          change_number: 1,
          amount: 3000,
          changed_date: "2000-02-21T20:00:00.000+00:00",
          remark: "monthly payment",
        },
      ],
    },
    {
      account_number: "102",
      balance: 5000,
      account_changes: [
        {
          change_number: 1,
          amount: 3000,
          changed_date: "2000-02-21T20:00:00.000+00:00",
          remark: "monthly payment",
        },
        {
          change_number: 2,
          amount: 1000,
          changed_date: "2000-02-22T20:00:00.000+00:00",
          remark: "bonus",
        },
      ],
    },
    {
      account_number: "103",
      balance: 5000,
      account_changes: [
        {
          change_number: 1,
          amount: 3000,
          changed_date: "2000-02-21T20:00:00.000+00:00",
          remark: "monthly payment",
        },
      ],
    },
    {
      account_number: "104",
      balance: 5000,
      account_changes: [
        {
          change_number: 1,
          amount: 3000,
          changed_date: "2000-02-21T20:00:00.000+00:00",
          remark: "monthly payment",
        },
      ],
    },
    {
      account_number: "105",
      balance: 5000,
      account_changes: [
        {
          change_number: 1,
          amount: 3000,
          changed_date: "2000-02-21T20:00:00.000+00:00",
          remark: "monthly payment",
        },
      ],
    },
  ];

  try {
    await client.connect();

    const database = client.db("databaseWeek4");

    const collectionAccounts = database.collection("accounts");
    await collectionAccounts.deleteMany({});
    const resultAccounts = await collectionAccounts.insertMany(dataAccounts);
    console.log("added Accounts ", resultAccounts.insertedCount);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};
