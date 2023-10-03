import { NextApiRequest, NextApiResponse } from "next";
import { createMovie } from "../../controller/MovieController";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != 'POST') {
        return res.status(403).json({ message: "Method Not Allowed" });
    }

    const { title, synopsys, releaseYear, duration } = req.body;

    //create model
    const response = await createMovie(title, synopsys, releaseYear, duration);

    if (response.message != undefined) {
        return res.status(403).json(response);
    }

    return res.status(200).json(response);
}