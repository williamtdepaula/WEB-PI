import { addressIsValid, CPFIsValid, emailIsValid, nameIsValid, phoneIsValid, stringHasOnlyNumbers } from "../resources/validations"

describe('function nameIsValid', () => {
    it('Should return true if param is a correct value', () => {
        expect(nameIsValid('William')).toBe(true)
    })

    it('Should return false is param is a wrong value', () => {
        expect(nameIsValid('')).toBe(false)
    })
})

describe('function emailIsValid', () => {
    it('Should return true if param is a correct email', () => {
        expect(emailIsValid('email@email.com')).toBe(true)
    })

    it('Should return false if param is wrong correct email', () => {
        expect(emailIsValid('email.com')).toBe(false)
        expect(emailIsValid('email@.com')).toBe(false)
        expect(emailIsValid('.com')).toBe(false)
        expect(emailIsValid('')).toBe(false)
    })
})

describe('function CPFIsValid', () => {
    it('Should return true if param is a correct CPF', () => {
        expect(CPFIsValid('123.456.789-09')).toBe(true)
    })

    it('Should return false if param is wrong correct CPF', () => {
        expect(CPFIsValid('123.456.789-08')).toBe(false)
        expect(CPFIsValid('12345678908')).toBe(false)
        expect(CPFIsValid('123')).toBe(false)
        expect(CPFIsValid('')).toBe(false)
    })
})

describe('function addressIsValid', () => {
    it('Should return true if param is a correct addres', () => {
        expect(addressIsValid('50, Jardim Cotia, Cotia')).toBe(true)
    })

    it('Should return false is param is a wrong addres', () => {
        expect(addressIsValid('')).toBe(false)
    })
})

describe('function phoneIsValid', () => {
    it('Should return true if param is a correct phone', () => {
        expect(phoneIsValid('1134567890')).toBe(true)
    })

    it('Should return false is param is a wrong phone', () => {
        expect(phoneIsValid('123123121232323')).toBe(false)
        expect(phoneIsValid('12312312')).toBe(false)
        expect(phoneIsValid('')).toBe(false)
    })
})

describe('function stringHasOnlyNumbers', () => {
    it('Should return true if value has only numbers', () => {
        expect(stringHasOnlyNumbers('12345')).toBe(true)
    })

    it('Should return false if value has not only numbers', () => {
        expect(stringHasOnlyNumbers('a123c')).toBe(false)
        expect(stringHasOnlyNumbers('abc')).toBe(false)
    })
})