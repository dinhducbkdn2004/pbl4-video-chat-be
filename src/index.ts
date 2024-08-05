import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";

const app: Express = express();

dotenv.config();

const PORT: string | number = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, World123123!");
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
