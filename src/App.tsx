import './App.css';
import * as Wrdl from './wrdl';
import { useState, useEffect, useCallback } from 'react';

const useWrdl = (): [Wrdl.Game, string] => {
  const [game, setGame] = useState(Wrdl.createGame());
  const [guess, setGuess] = useState('');

  const handleKey = useCallback((e: any) => {
    const char: string = e.key.toLowerCase();
    switch (true) {
      case char === 'enter':
        if (Wrdl.isValidGuess(guess, game)) {
          setGame(Wrdl.makeGuess(guess, game));
          setGuess("");
        }
        return;
      case char === 'backspace':
        return setGuess(guess.slice(0, -1));
      case /^[a-z]$/.test(char) && guess.length < game.maxWordLength:
        return setGuess(guess + char);
    }
  }, [game, guess]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return [game, guess];
};

function App() {
  const [game, guess] = useWrdl();

  return (
    <div className="app">
      {game.guesses.map((guess, index) => <Guess key={index} word={guess} score={game.scores[index]} />)}
      {game.guessesRemaining > 0 && <Guess key="guess" word={guess.padEnd(4)} />}
    </div>
  );
}

export default App;

type GuessProps = {
  word: string;
  score?: Wrdl.WordScore;
}

const Guess = ({ word, score }:GuessProps) => {
  return <div className="guess">
    {word.split('').map((letter, idx) => <div key={idx} className={`letter ${score && score[idx]}`}><div>{letter}</div></div>)}
  </div>
};
