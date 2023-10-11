import { NextApiRequest, NextApiResponse } from "next";
import { selectGenres } from "../../controller/GenreController";

export default async (req:NextApiRequest , res:NextApiResponse) => {
    if ( req.method != "GET" ) {
        return res.status(403).json( { message: "Method not allowed" } );
    }

    const movies = await selectGenres();

    if ( movies.message ) {
        return res.status(500).json(movies);
    }

    return res.status(200).json(movies);
} 