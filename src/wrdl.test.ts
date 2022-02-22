import * as Wrdl from './wrdl';

describe('checkGuess', () => {
    it('identifies correct letters', () => {
        expect(Wrdl.scoreGuess("a", "a")).toEqual(["C"]);
    });

    it("identifies incorrect letters", () => {
        expect(Wrdl.scoreGuess("a", "b")).toEqual(['I']);
    });

    it('identifies almost letters', () => {
        expect(Wrdl.scoreGuess("ab", "bc")).toEqual(['I', 'A']);
    });

    it('identifies a duplicate guess letter as wrong', () => {
        expect(Wrdl.scoreGuess("bob", "bco")).toEqual(['C', 'A', 'I']); 
    });

    it('identifies a duplicate guess letter as almost', () => {
        expect(Wrdl.scoreGuess("bob", "bbo")).toEqual(['C', 'A', 'A']); 
    });
    it('identifies a duplicate guess letter as correct', () => {
        expect(Wrdl.scoreGuess("bob", "bob")).toEqual(['C', 'C', 'C']); 
    });
});