import { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "../../controller/UserController";
import userRequest from "@/request/userRequest";
import { stringify } from "querystring";



export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != 'POST') {
        return res.status(403).json({message: "Method not allowed."});
    }

    const {_name , _email , _password} = req.body;

    const checkRequest = userRequest(_password, _email, _name);

    if (checkRequest.status == false) {
        return res.status(403).json( {message: checkRequest.message} );
    }

    const response = await createUser(_email, _name, _password);

    if ( response != undefined) {
        return res.status(200).json(response);
    }

}