import { Request, Response } from "express";
import responseHandler from "../../handlers/response.handler";

import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { SearchGroupsAndUsers } from "./dtos/search.dto";

const searchRoute: Router = Router();
searchRoute.get(
    "/search-groups-and-users",
    async (req: Request<SearchGroupsAndUsers, {}, {}>, res: Response) => {
        const { name, page, limit } = req.params;
    }
);

export default searchRoute;
