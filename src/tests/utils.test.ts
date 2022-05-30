import { getBestTimeToContact, getGender, getGroupRiskTreated, treatAddress } from "../resources/utils"

describe('function getBestTimeToContact', () => {
    it('Should return "Tarde" if param is "T"', () => {
        expect(getBestTimeToContact('T')).toBe('Tarde')
    })

    it('Should return "Manhã" if param is different "T"', () => {
        expect(getBestTimeToContact('M')).toBe('Manhã')
    })
})

describe('function getGender', () => {
    it('Should return "Prefiro não dizer if param is "N"', () => {
        expect(getGender('N')).toBe('Prefiro não dizer')
    })

    it('Should return "Masculino" if param is "M"', () => {
        expect(getGender('M')).toBe('Masculino')
    })

    it('Should return "Feminino" if param is "F"', () => {
        expect(getGender('F')).toBe('Feminino')
    })
})

describe('function treatAddress', () => {
    it('Should return address formated', () => {
        expect(treatAddress('5', 'Rua Manuel Garcia', 'Alameda Josué', 'Vargem Grande Paulista')).toBe('5, Rua Manuel Garcia, Alameda Josué, Vargem Grande Paulista')
    })
})

describe('function getGroupRiskTreated', () => {
    it('Should return array joined in string from db formated to view', () => {
        expect(getGroupRiskTreated('Gestantes,Idosos maiores de 65 anos')).toBe('Gestantes, Idosos maiores de 65 anos')
    })
})