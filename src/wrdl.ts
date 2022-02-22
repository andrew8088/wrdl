import words from './words';

type LetterScore = "I" | "A" | "C";
type WordScore = Array<LetterScore>;

const INCORRECT: LetterScore = "I";
const ALMOST: LetterScore = "A";
const CORRECT: LetterScore = "C";

const getRandomInt = (min: number, max: number) => 
    Math.floor(Math.random() * (max - min + 1)) + min;

export const getWord = () => words[getRandomInt(0, words.length - 1)];

export const checkGuess = (guess: string, answer: string): WordScore => {
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