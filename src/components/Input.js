import React, { useState, useRef, useEffect, createRef } from 'react';
import "../css/Input.css"
import wordList from "../wordList"

const Input = (props) => {

    const [input, setInput] = useState(['', '', '', '', '']);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [feedback, setFeedback] = useState(Array(5).fill("#121213"));
    const inputRefs = useRef(input.map(() => createRef()));

    const handleInputChange = (index, event) => {
        const newInput = [...input];
        setCurrentIndex(index)
        newInput[index] = event.target.value.toUpperCase();
        setInput(newInput);

        if (index < input.length - 1 && event.target.value !== '') {
            inputRefs.current[index + 1].current.focus();
            setCurrentIndex(index + 1);
        }
    };

    const zip = (arrays) => {
        return arrays[0].map((_, i) => arrays.map((array) => array[i]));
    }

    useEffect(() => {
        const keyDown = (event) => {

            if (event.key === 'Backspace' && currentIndex > 0 && input[currentIndex] === '') {
                // Delete recent character
                setCurrentIndex(currentIndex - 1);
                inputRefs.current[currentIndex - 1].current.focus();
            }
            if (event.key === 'Enter' && input[4] !== '') {
                if (!wordList.includes(input.join("").toLowerCase())) {
                    // TODO: Word entered isn't a valid five letter word
                    console.log("invalid")
                } else {
                    // Submit guess
                    const evaluation = props.onGuess(input)
                    let newFeedback = Array(5).fill(null);

                    for (let i = 0; i < evaluation.length; i++) {
                        newFeedback[i] = evaluation[i]
                    }
                    setFeedback(newFeedback);
                }
            }
        };


        document.addEventListener("keydown", keyDown);
        inputRefs.current[currentIndex].current.focus();

        return () => {
            document.removeEventListener("keydown", keyDown);
        };

    }, [currentIndex, input]);


    return (
        <div className="wordle-input">
            {zip([input, feedback]).map((value, index) => (
                <input
                    key={index}
                    ref={inputRefs.current[index]}
                    type="text"
                    maxLength="1"
                    value={value[0]}
                    style={{ backgroundColor: value[1] }}
                    onChange={(event) => handleInputChange(index, event)}
                />
            ))}
        </div>
    );

}

export default Input;
