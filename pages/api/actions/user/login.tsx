import { NextApiRequest, NextApiResponse } from "next";
import { loginUser } from "../../controller/UserController";
import { isEmail } from "@/request/check";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != 'POST') {
        return res.status(403).json({massege: "Method not allowed"});
    }

    const { login, password } = req.body;

    let response = undefined;
    
    if (isEmail(login)) {
        response = await loginUser(password, login, null);        
    } else {
        response = await loginUser(password, null, login);
    }

    if (response.message != undefined) {
        return res.status(403).json(response);
    }
    
    return res.status(200).json(response);

}