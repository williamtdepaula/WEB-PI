import { maskRemoveAllSpecialCharacters } from "./masks";

function nameIsValid(name: string) {
    return name.length > 0;
}

function emailIsValid(email: string) {
    const res: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(email).toLowerCase());
}

function CPFIsValid(CPF: string) {
    CPF = maskRemoveAllSpecialCharacters(CPF)
    const cpfOnlyNumber = CPF.replace(/[^\d]+/g, '');

    const isCpfValid = (cpf: string) => {
        if (cpf.length !== 11) {
            return false;
        }
        let same_digits = true;
        for (let i = 0; i < cpf.length - 1; i++) {
            if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
                same_digits = false;
                break;
            }
        }

        const validDigit = (strCPF: string, n: number) => {
            let sum = 0;
            for (let i = 0; i < n - 1; i++) {
              sum += parseInt(strCPF[i]) * (n - i);
            }
            let rest = 11 - (sum % 11);
            if (rest >= 10) {
              rest = 0;
            }
            return rest === parseInt(strCPF[n - 1]);
          };
          

        return !same_digits && validDigit(cpf, 10) && validDigit(cpf, 11);
    };


    return /^[0-9]{11}$/.test(cpfOnlyNumber) && isCpfValid(cpfOnlyNumber);
}


function addressIsValid(address: string) {
    return address.length > 0
}

function phoneIsValid(phone: string) {
    return maskRemoveAllSpecialCharacters(phone).length === 11 || maskRemoveAllSpecialCharacters(phone).length === 10
}

export {
    nameIsValid,
    emailIsValid,
    addressIsValid,
    phoneIsValid,
    CPFIsValid
}