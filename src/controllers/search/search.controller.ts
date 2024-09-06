import { Request, Response } from "express";
import responseHandler from "../../handlers/response.handler";

import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { SearchGroupsAndUsers } from "./dtos/search.dto";

const searchRoute: Router = Router();
searchRoute.get(
    "/search-groups-and-users",
    authenticate,
    async (req: Request, res: Response) => {
        const { name, page, limit } = req.query;
    }
);

export default searchRoute;
