import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";
import routes from "./routes";
import bodyParser from "body-parser";
import connectDb from "./configs/database.config";

const app: Express = express();

dotenv.config();

const PORT: string | number = process.env.PORT || 3000;

connectDb();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", routes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
