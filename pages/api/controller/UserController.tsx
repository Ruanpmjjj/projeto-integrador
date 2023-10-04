import { stringify } from "querystring";
import { createUserModel, findUserByModelEmail, findUserByModelLoginByEmail, findUserByModelLoginByNickName, findUserByModelNickName, verifyEmail} from "../model/user";
import { generateToken } from '@/servicess/tokenConfig';

export async function createUser(_email: string, _nickName: string, _password: string) {
    const userByEmail = await findUserByModelEmail(_email);

    if (userByEmail != undefined) {
        return {message: "Email already registered."};
    }

    const userByNickName = await findUserByModelNickName(_nickName);

        if (userByNickName != undefined) {
            return {message: "NickName already registered."};
        }

        const response = await createUserModel(_nickName, _email, _password);
        return response;
}

export async function loginIfEmail(_email:string, _password:string) {
    const userLogin = await findUserByModelLoginByEmail(_email, _password);

    if (userLogin == undefined) {
        return {message: "incorrect email or password"}
    }

    const _token = generateToken(userLogin.email);
    return {token: _token}
}

export async function loginIfNickName(_nickName:string, _password:string) {
        const userLogin = await findUserByModelLoginByNickName(_nickName, _password);

        if (userLogin == undefined) {
            return {message: "incorrect NickName or Password"}
        }


}
