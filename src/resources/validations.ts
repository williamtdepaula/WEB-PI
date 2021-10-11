import { maskRemoveAllSpecialCharacters } from "./masks";

function nameIsValid(name: string) {
    return name.length > 0;
}

function emailIsValid(email: string) {
    const res: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(email).toLowerCase());
}

function addressIsValid(address: string){
    return address.length > 0
}

function phoneIsValid(phone: string){
    return maskRemoveAllSpecialCharacters(phone).length === 11
}

export {
    nameIsValid,
    emailIsValid,
    addressIsValid,
    phoneIsValid
}