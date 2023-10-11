import { NextApiRequest, NextApiResponse } from "next";
import { login } from "../../controller/UserController";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != 'POST') {
        return res.status(403).json({massege: "Method not allowed"});
    }

    const { password, email, nickName} = req.body;

    const response = await login(password, email || null, nickName ||null);

    if (response.message != undefined) {
        return res.status(403).json(response);
    }
    
    return res.status(200).json(response);

}