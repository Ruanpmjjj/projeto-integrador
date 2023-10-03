//import { isEmail, checkMinAndMaxLength } from "./check";
import * as check from "./check";

export default function userRequest(cpf: any, email: any, password: any, name: any){
    if (!check.checkMinAndMaxLength(cpf, 14, 14)) {
        return {status: false, message: "Invalid CPF."};
    }

    /*if (!check.isValidCpf(cpf)) {
        return {status: false, message: "Invalid 2.0 CPF."};
    }*/

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