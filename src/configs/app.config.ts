import { Express, Response } from "express";
import cors from "cors";
import corsOptions from "./cors.config";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import routes from "../routes";
import morgan from "morgan";
const configApp = async (app: Express) => {
  app.use(cors(corsOptions));
  app.options("*", cors(corsOptions));

  app.use(cookieParser());

<<<<<<< HEAD
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan(":method :status - :response-time ms"));

  // API routes
  app.use("/api/v1", routes);
=======
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(morgan(":method :status - :response-time ms"));
    app.get("/", (_, res: Response) => {
        res.send("Hello world from the API!");
    });
    // API routes
    app.use("/api/v1", routes);
>>>>>>> 02c9f79fd36ac6f5a2c8bdc2a9f80ae4549a88ff
};
export default configApp;
