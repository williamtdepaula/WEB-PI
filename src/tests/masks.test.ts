import { maskCpf, maskRemoveAllSpecialCharacters, phoneMask } from "../resources/masks"

describe('function phoneMask', () => {
    it('Should return phone masked', () => {
        expect(phoneMask('11345678977')).toBe('(11) 34567-8977')
    })
})

describe('function maskRemoveAllSpecialCharacters', () => {
    it('Should return string without special character', () => {
        expect(maskRemoveAllSpecialCharacters('teste#valor @|!')).toBe('testevalor')
    })
})

describe('function maskCpf', () => {
    it('Should return CPF formatted', () => {
        expect(maskCpf('12345678909')).toBe('123.456.789-09')
    })
})