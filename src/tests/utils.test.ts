import { getBestTimeToContact } from "../resources/utils"

describe('Utils', () => {
    it('Should return "Tarde" if param is "T"', () => {
        expect(getBestTimeToContact('T')).toBe('Tarde')
    })
})

export {}