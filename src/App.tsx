import './App.css';
import * as Wrdl from './wrdl';
import { useState, useEffect, useCallback } from 'react';

const isLetter = (char: string) => /^[a-z]$/.test(char);

const useWrdl = (): [Wrdl.Game, string, boolean] => {
  const [game, setGame] = useState(Wrdl.createGame(undefined, undefined, true));
  const [guess, _setGuess] = useState('');
  const [valid, setValid] = useState(true);

  const setGuess = useCallback((guess) => {
    _setGuess(guess);
    setValid(guess.length !== game.maxWordLength || Wrdl.isValidGuess(guess, game));
  }, [game]);

  const handleKey = useCallback((e: any) => {
    const char: string = e.key.toLowerCase();
    switch (true) {
      case char === 'enter':
        if (Wrdl.isValidGuess(guess, game)) {
          setGame(Wrdl.makeGuess(guess, game));
          setGuess("");
        } else {
          setGuess(guess);
        }
        return;
      case char === 'backspace':
        setGuess(guess.slice(0, -1));
        return;
      case isLetter(char) && guess.length < game.maxWordLength:
        setGuess(guess + char);
        return;
    }
  }, [game, guess, setGuess]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return [game, guess, valid];
};

function App() {
  const [game, guess, valid] = useWrdl();

  const emptyRows = Array(game.guessesRemaining - 1).fill(0).map((_, i) =>
    <Guess key={i} word={"".padStart(game.maxWordLength)} />
  );

  return (
    <div className="app">
      {game.guesses.map((guess, index) => <Guess key={index} word={guess} score={game.scores[index]} />)}
      {game.guessesRemaining > 0 && <Guess key="guess" active valid={valid} word={guess.padEnd(game.maxWordLength)} />}
      {emptyRows}
    </div>
  );
}

export default App;

type GuessProps = {
  word: string;
  score?: Wrdl.WordScore;
  active?: boolean
  valid?: boolean
}

const Guess = ({ word, score, active, valid = true }:GuessProps) => {
  return <div className={score || active ? valid === false ? "guess invalid" : "guess": "guess inactive"}>
    {word.split('').map((letter, idx) => <div key={idx} className={`letter ${score && score[idx]}`}><div>{letter}</div></div>)}
  </div>
};
