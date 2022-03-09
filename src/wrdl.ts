import words from './words';

type LetterScore = "I" | "A" | "C";
export type WordScore = LetterScore[];

const INCORRECT: LetterScore = "I";
const ALMOST: LetterScore = "A";
const CORRECT: LetterScore = "C";

export type Game = {
    dictionary: string[];
    answer: string;
    hardMode: boolean;
    guessesRemaining: number;
    guesses: string[];
    scores: WordScore[];
    maxWordLength: number;
}

const getRandomInt = (min: number, max: number) => 
    Math.floor(Math.random() * (max - min + 1)) + min;

export const getWord = () => words[getRandomInt(0, words.length - 1)];

export const scoreGuess = (guess: string, answer: string): WordScore => {
    const guessLetters = guess.split('');
    const answerLetters = answer.split('');

    const score: WordScore = [];

    guessLetters.forEach((letter, idx) => {
        if (letter !== answerLetters[idx]) return;
        score[idx] = CORRECT;
        answerLetters[idx] = "";
        guessLetters[idx] = "";
    });
    
    guessLetters.forEach((letter, idx) => {
        if (letter === "") return;
        if (!answerLetters.includes(letter)) {
            score[idx] = INCORRECT;
        } else {
            score[idx] = ALMOST;
            const answerIdx = answerLetters.findIndex(char => char === letter);
            answerLetters[answerIdx] = '';
        }
    });
    return score;
}

export const createGame = (dictionary: string[] = words, answer: string = getWord(), hardMode = false): Game => {
    return {
        dictionary,
        answer,
        hardMode,
        guessesRemaining: 6,
        guesses: [],
        scores: [],
        maxWordLength: 4
    };
}

export const makeGuess = (guess: string, game: Game): Game =>  {
    if (!isValidGuess(guess, game)) {
        throw new Error(guess + ' is an invalid guess');
    }
    
    return {
        ...game,
        guessesRemaining: game.answer === guess ? 0 : game.guessesRemaining === 0 ? 0 : game.guessesRemaining - 1,
        guesses: game.guesses.concat([guess]),
        scores: game.scores.concat([scoreGuess(guess, game.answer)])
    }
};

export const isValidGuess = (guess: string, game: Game): boolean => {
    if (!game.dictionary.includes(guess)) return false;
    if (game.guesses.includes(guess)) return false;

    const lastGuess = game.guesses[game.guesses.length - 1];
    const lastScore = game.scores[game.scores.length - 1];
    if (game.hardMode && lastScore) {
        for (let i = 0; i < lastScore.length; i++) {
            if (lastScore[i] === CORRECT && guess[i] !== lastGuess[i]) {
                return false;
            }
            if (lastScore[i] === ALMOST && !guess.includes(lastGuess[i])) {
                return false;
            }
        }
    }

    return true;
};