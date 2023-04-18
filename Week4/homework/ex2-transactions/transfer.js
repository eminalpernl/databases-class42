import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();
const URI = process.env.MONGODB_URL;
import { addData } from "./setup.js";

async function main() {
  await addData();
  await transferMoney("102", "103", 100, "Transfer");
}

async function transferMoney(sender, receiver, amount, remark) {
  const client = new MongoClient(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const accountsCollection = client.db("databaseWeek4").collection("accounts");

  try {
    await client.connect();

    const session = client.startSession();

    await session.withTransaction(async () => {
      const fromAccount = await accountsCollection.findOne(
        { account_number: sender },
        { session }
      );
      const toAccount = await accountsCollection.findOne(
        { account_number: receiver },
        { session }
      );
      if (!fromAccount || !toAccount) {
        throw new Error("Account number not found");
      }

      if (fromAccount.balance < amount) {
        throw new Error("Insufficient balance");
      }

      const timestamp = new Date().toISOString();

      const fromAccountChanges = fromAccount.account_changes;
      const fromAccountChangeNumber = fromAccountChanges.length + 1;
      fromAccountChanges.push({
        change_number: fromAccountChangeNumber,
        amount: -amount,
        changed_date: timestamp,
        remark: remark,
      });

      const toAccountChanges = toAccount.account_changes;
      const toAccountChangeNumber = toAccountChanges.length + 1;
      toAccountChanges.push({
        change_number: toAccountChangeNumber,
        amount: amount,
        changed_date: timestamp,
        remark: remark,
      });

      await accountsCollection.updateOne(
        { account_number: sender },
        {
          $set: {
            balance: fromAccount.balance - amount,
            account_changes: fromAccountChanges,
          },
        },
        { session }
      );
      await accountsCollection.updateOne(
        { account_number: receiver },
        {
          $set: {
            balance: toAccount.balance + amount,
            account_changes: toAccountChanges,
          },
        },
        { session }
      );
    });
    await session.endSession();
    console.log(
      `Successfully transferred ${amount} $ from ${sender} to ${receiver}`
    );
  } catch (error) {
    console.error(error);
    session.endSession();
    console.log("Transaction aborted");
  } finally {
    await client.close();
  }
}

main();
