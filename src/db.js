import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

let db = null;
const databaseName = process.env.DATABASE;
try {
    const mongoClient = new MongoClient(process.env.MONGO_URI);
    await mongoClient.connect();
    db = mongoClient.db(databaseName);
    console.log(chalk.bold.greenBright(`Connection established! Accessing ${databaseName}...`));
} catch(e) {
    console.log(chalk.bold.redBright(`Error connecting to ${databaseName}!`), e);    
}

export default db;