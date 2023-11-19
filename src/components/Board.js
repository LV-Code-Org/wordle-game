import React, { useState } from 'react';
import Input from './Input';
import StaticInput from './StaticInput';
import wordList from '../wordList';

const generateRandomWord = () => {
    return wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
}

const Board = () => {
    const [targetWord, setTargetWord] = useState(generateRandomWord());
    const [guesses, setGuesses] = useState([]);
    const [currentAttempt, setCurrentAttempt] = useState(1);
    const [solved, setSolved] = useState(false)

    const blank = new Array(5).fill(["", "#3c3c3c"])

    const handleGuess = (guess) => {
        const currentGuess = guess.join("");
        const feedbackColors = checkGuess(currentGuess, targetWord);

        setGuesses([...guesses, { guess: currentGuess, feedbackColors }]);

        setCurrentAttempt(currentAttempt + 1);

        if (
            JSON.stringify(checkGuess(currentGuess, targetWord)) ==
            JSON.stringify(["#6aaa64", "#6aaa64", "#6aaa64", "#6aaa64", "#6aaa64"])
        ) {
            setSolved(true)
        }

        return checkGuess(currentGuess, targetWord)
    };

    const checkGuess = (guess, target) => {
        return Array.from({ length: guess.length }, (_, i) => {
            if (guess[i] === target[i]) {
                return '#6aaa64';
            } else if (target.includes(guess[i])) {
                return '#c9b458';
            }
            return '#3c3c3c';
        });
    };

    const renderRows = () => {
        const rows = [];

        for (let i = 0; i < 6; i++) {
            if (i < currentAttempt - 1) {
                const previousGuess = guesses[i] || { guess: '', feedbackColors: [] };
                console.log(zip([previousGuess.guess.split(''), previousGuess.feedbackColors]))
                rows.push(
                    <StaticInput
                        key={i}
                        info={zip([previousGuess.guess.split(''), previousGuess.feedbackColors])}
                    />
                );
            } else if (i === currentAttempt - 1) {
                if (!solved) {
                    rows.push(
                        <Input key={i} onGuess={handleGuess} />
                    );
                } else {
                    rows.push(<StaticInput key={i} info={blank} />)
                }
            } else {
                rows.push(<StaticInput key={i} info={blank} />)
            }
        }
        return rows;
    };


    const zip = (arrays) => {
        return arrays[0].map((_, i) => arrays.map((array) => array[i]));
    }

    return (
        <div className="Board">
            {renderRows()}
        </div>
    );
}

export default Board;
