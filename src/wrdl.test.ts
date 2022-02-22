import * as Wrdl from './wrdl';

describe('checkGuess', () => {
    it('identifies correct letters', () => {
        expect(Wrdl.checkGuess("a", "a")).toEqual(["C"]);
    });

    it("identifies incorrect letters", () => {
        expect(Wrdl.checkGuess("a", "b")).toEqual(['I']);
    });

    it('identifies almost letters', () => {
        expect(Wrdl.checkGuess("ab", "bc")).toEqual(['I', 'A']);
    });

    it('identifies a duplicate guess letter as wrong', () => {
        expect(Wrdl.checkGuess("bob", "bco")).toEqual(['C', 'A', 'I']); 
    });

    it('identifies a duplicate guess letter as almost', () => {
        expect(Wrdl.checkGuess("bob", "bbo")).toEqual(['C', 'A', 'A']); 
    });
    it('identifies a duplicate guess letter as correct', () => {
        expect(Wrdl.checkGuess("bob", "bob")).toEqual(['C', 'C', 'C']); 
    });
});