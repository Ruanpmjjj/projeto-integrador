//import { isEmail, checkMinAndMaxLength } from "./check";
import * as check from "./check";

export default function userRequest(password: any, email: any, name: any){

    if (!check.isEmail(email)) {
        return {status: false, message: "Ivalid Email."};
    }

    if (!check.checkMinAndMaxLength(password, 6, 32)) {
        return {status: false, message: "Invalid Password."};
    }

    if (!check.checkMinAndMaxLength(name, 3, 32) && name != undefined && name != '') {
        return {status: false, message: "Invalid Name"};
    }

    return {status: true};
}