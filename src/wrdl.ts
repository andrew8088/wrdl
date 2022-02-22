import words from './words';

type LetterScore = "I" | "A" | "C";
type WordScore = LetterScore[];

const INCORRECT: LetterScore = "I";
const ALMOST: LetterScore = "A";
const CORRECT: LetterScore = "C";

type Game = {
    answer: string;
    guessesRemaining: number;
    guesses: string[];
    scores: WordScore[];
}

const getRandomInt = (min: number, max: number) => 
    Math.floor(Math.random() * (max - min + 1)) + min;

export const getWord = () => words[getRandomInt(0, words.length - 1)];

export const scoreGuess = (guess: string, answer: string): WordScore => {
    const guessLetters = guess.split('');
    const answerLetters = answer.split('');

    const score: WordScore = [];

    guessLetters.forEach((letter, idx) => {
        if (letter === answerLetters[idx]) {
            score.push(CORRECT);
            answerLetters[idx] = "";
            return;
        }

        if (answerLetters.includes(letter)) {
            score.push(ALMOST);    
            return;
        }
        
        score.push(INCORRECT);
    });

    return score;
}

export const createGame = (answer: string = getWord()): Game => {
    return {
        answer,
        guessesRemaining: 6,
        guesses: [],
        scores: []
    };
}

export const makeGuess(game: Game, guess: string): Game =>  {

    return {
        answer: game.answer,
        guessesRemaining: game.guessesRemaining - 1,
        guesses: [...game.guesses].concat([guess]),
    }

};
