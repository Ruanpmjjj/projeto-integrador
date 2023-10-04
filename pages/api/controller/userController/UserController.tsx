import { createUserModel, findUserByModelEmail, findUserByModelNickNmae } from "../../model/user";

export async function createUser(_email: string, _nickName: string, _password: string) {
    const userByEmail = await findUserByModelEmail(_email);

    if (userByEmail != undefined) {
        return {message: "Email already registered."};
    }

    const userByNickName = await findUserByModelNickNmae(_nickName);

        if (userByNickName != undefined) {
            return {message: "NickName already registered."};
        }

        const response = await createUserModel(_nickName, _email, _password);
        return response;
}