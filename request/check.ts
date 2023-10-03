export function isString(value: any): boolean{
    if ((value instanceof String) || (typeof value === 'string'))
        return true;
    return false;
}

export function checkMinAndMaxLength(value: any, min: number, max: number):boolean {
    let verifyValue = undefined;

    if (isString(value)) {
        verifyValue = String(value);
    }

    if (verifyValue == undefined) {
        return false;
    }

    if ((verifyValue.length >= min) && (verifyValue.length <= max)) {
        return true;
    }
    return false;
}

export function isEmail(value: any): boolean{
    if (!isString(value)) {
        return false;
    }
    
    const check = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

    return check.test(value);

}

/*export function isValidCpf(value: any): boolean{
    if (!isString(value)) {
        return false;
    }

    const check = /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})*$/gi;
    return check.test(value);

}*/