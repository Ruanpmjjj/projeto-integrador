import { NextApiRequest, NextApiResponse } from "next";
import { createMovie } from "../../controller/MovieController";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != "POST") {
        return res.status(403).json({ message: "Method not allowed" });
    }

    const { title, synopsis, releaseYear, duration, genres } = req.body;

    // create model
    const response = await createMovie(title, synopsis, releaseYear, duration, genres);

    if ( response.message != undefined ) {
        return res.status(403).json( response );
    }

    return res.status(200).json( response );
}