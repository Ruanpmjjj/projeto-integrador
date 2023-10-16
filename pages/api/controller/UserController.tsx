import { createUserModel, findUserByModelEmail, findUserByModelLoginByEmail, findUserByModelLoginByNickName, findUserByModelNickName} from "../model/user";
import { generateToken } from '@/services/tokenConfig';

export async function createUser(_email: string, _nickName: string, _password: string) {
    try {
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

    } catch (error) {
        return { message: "Something went Wrong."};
    }
}

export async function loginUser(_password:string, _email:string | null, _nickName:string | null) {
    try {
        if (_email) {
            const userLogin = await findUserByModelLoginByEmail(_email, _password);
        
            if (userLogin == undefined) {
                return {message: "incorrect email or password"}
            }
        
            const _token = generateToken(userLogin.nickName);
            return {token: _token}
        }

        if (_nickName) {
            const userLogin = await findUserByModelLoginByNickName(_nickName, _password);
        
            if (userLogin == undefined) {
                return {message: "incorrect NickName or Password"}
            }
            const _token = generateToken(userLogin.nickName);

            return {token: _token}
        }
        
    } catch (error) {
        return {
            message: "Something went wrong"
        }
    }
}