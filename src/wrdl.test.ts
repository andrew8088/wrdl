import * as Wrdl from "./wrdl";

describe("checkGuess", () => {
  it("identifies correct letters", () => {
    expect(Wrdl.scoreGuess("a", "a")).toEqual(["C"]);
  });

  it("identifies incorrect letters", () => {
    expect(Wrdl.scoreGuess("a", "b")).toEqual(["I"]);
  });

  it("identifies almost letters", () => {
    expect(Wrdl.scoreGuess("ab", "bc")).toEqual(["I", "A"]);
  });

  it("identifies a duplicate guess letter as wrong", () => {
    expect(Wrdl.scoreGuess("bob", "bco")).toEqual(["C", "A", "I"]);
  });

  it("identifies a duplicate guess letter as almost", () => {
    expect(Wrdl.scoreGuess("bob", "bbo")).toEqual(["C", "A", "A"]);
  });
  it("identifies a duplicate guess letter as correct", () => {
    expect(Wrdl.scoreGuess("bob", "bob")).toEqual(["C", "C", "C"]);
  });
  it("wat", () => {
    expect(Wrdl.scoreGuess("bbba", "aaab")).toEqual(["A", "I", "I", "A"]);
  });
});

describe("isValidGuess", () => {
  // - in dictionary
  // - not already used
  // - matches already known info, if in hard mode

  let game: Wrdl.Game;

  beforeEach(() => {
    game = Wrdl.createGame(
      ["aaaa", "aabb", "bbaa", "bbbb", "bbba", "aaab"],
      "aaab"
    );
  });

  it("accepts guesses that are in the dictionary", () => {
    expect(Wrdl.isValidGuess("bbbb", game)).toBeTruthy();
  });
  it("rejects guesses that are NOT in the dictionary", () => {
    expect(Wrdl.isValidGuess("cccc", game)).toBeFalsy();
  });
  it("rejects guesses that are already used", () => {
    game = Wrdl.makeGuess("aaaa", game);
    expect(Wrdl.isValidGuess("aaaa", game)).toBeFalsy();
  });
  it("accepts guesses that do not match existing correct letters in easy mode", () => {
    game = Wrdl.makeGuess("aabb", game);
    expect(Wrdl.isValidGuess("bbaa", game)).toBeTruthy();
  });
  it("rejects guesses that do not match existing correct letters in hard mode", () => {
    game = Wrdl.makeGuess("aabb", game);
    game.hardMode = true;
    expect(Wrdl.isValidGuess("bbaa", game)).toBeFalsy();
  });
  it("rejects guesses that do not include existing almost letters in hard mode", () => {
    game = Wrdl.makeGuess("bbba", game);
    game.hardMode = true;
    expect(Wrdl.isValidGuess("aaaa", game)).toBeFalsy();
  });
});

