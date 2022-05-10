import express, {json} from "express";
import dotenv from "dotenv";
import cors from "cors";
import chalk from "chalk";
import router from "./routers/index.js";

const app = express();
app.use(json());
app.use(cors());

dotenv.config();

app.use(router);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(chalk.bold.cyanBright(`Server is running at port ${port}.`)));