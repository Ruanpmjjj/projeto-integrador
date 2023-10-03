import { NextApiRequest, NextApiResponse } from "next";
import { findMoviesByName } from "../../controller/MovieController";
import { isString } from "@/request/check";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != 'GET') {
        return res.status(403).json({ message: "Method Not Allowed" });
    }

    const { title } = req.query;

    if (title == undefined || isString(title) || title) {
        return res.status(403).json({ message: "Invalid Query"})
    }

    //find movie
    const response = await findMoviesByName(title);

    if (response.message != undefined) {
        return res.status(403).json(response);
    }

    return res.status(200).json(response);
}