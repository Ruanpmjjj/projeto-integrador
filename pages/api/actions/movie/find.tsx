import { NextApiRequest, NextApiResponse } from "next";
import { findMovieByPublicId } from "../../controller/MovieController";
import { isString } from "@/request/Check";

export default async (req:NextApiRequest , res:NextApiResponse) => {
    if ( req.method != "GET" ) {
        return res.status(403).json( { message: "Method not allowed" } );
    }

    const { publicId } = req.query;

    if ( publicId == undefined || !isString(publicId) || publicId instanceof Array ) {
        return res.status(403).json({ message: "Invalid query" });
    }

    const response = await findMovieByPublicId(publicId);

    if ( response.message != undefined ) {
        return res.status(403).json( response );
    }

    return res.status(200).json( response );
} 