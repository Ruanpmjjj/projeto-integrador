import { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "../../controller/UserController";
import userRequest from "@/request/userRequest";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != 'POST') {
        return res.status(403).json({message: "Method not allowed."});
    }

    const {name , email , password} = req.body;

    const checkRequest = userRequest(password, email, name);

    if (checkRequest.status == false) {
        return res.status(403).json( {message: checkRequest.message} );
    }

    const response = await createUser(email, name, password);

    if ( response != undefined) {
        return res.status(200).json(response);
    }

}