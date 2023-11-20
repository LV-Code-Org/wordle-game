import React, { useState, useEffect } from "react";
import "../css/Keyboard.css"

const Keyboard = ({ usedLetters }) => {

    const [guesses, setGuesses] = useState([])

    const zip = (arrays) => {
        return arrays[0].map((_, i) => arrays.map((array) => array[i]));
    }

    const parseGuesses = () => {
        const result = [];
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

        if (usedLetters.length === 0) {
            return;
        }

        for (let i = 0; i < usedLetters.length; i++) {
            result.push(zip([usedLetters[i].guess.split(''), usedLetters[i].feedbackColors]));
        }

        const groupedByLetter = (l) => l.reduce((acc, current) => {
            const key = current[0];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(current);
            return acc;
        }, {});

        const findElements = (l, index) => groupedByLetter(l)[index];
        let newResult = result.flat(1);

        const compareColors = (color1, color2) => {
            const colorOrder = ["#6aaa64", "#c9b458", "#3c3c3c", "#121213"];

            const index1 = colorOrder.indexOf(color1);
            const index2 = colorOrder.indexOf(color2);

            if (index1 < index2) {
                return color2;
            } else if (index1 > index2) {
                return color1;
            } else {
                return color1;
            }
        };

        for (let i = 0; i < alphabet.length; i++) {
            if (!newResult.some(([letter, color]) => letter === alphabet[i] && color !== "#121213")) {
                newResult.push([alphabet[i], "#121213"]);
            }

            const dupes = findElements(newResult, alphabet[i]);

            if (dupes && dupes.length > 1) {
                const highestColor = dupes.reduce((acc, curr) => compareColors(acc[1], curr[1]), dupes[0]);

                newResult = newResult.map(([letter, color]) => {
                    if (letter === alphabet[i]) {
                        return [letter, highestColor[1]];
                    }
                    return [letter, color];
                });
            }
        }

        const sortByZeroethIndex = (listOfLists) => {
            listOfLists.sort((a, b) => {
                const indexA = a[0];
                const indexB = b[0];

                return indexA.localeCompare(indexB);
            });

            return listOfLists;
        }

        setGuesses(sortByZeroethIndex(newResult));
    };


    useEffect(() => {
        parseGuesses()
    }, [usedLetters])

    const renderRow = (letters) => {
        // parseGuesses()
        const row = []
        for (let i = 0; i < letters.length; i++) {

            let correspondingColor = "#737373";
            for (let j = 0; j < guesses.length; j++) {
                if (guesses[j][0] == letters[i]) {
                    correspondingColor = guesses[j][1]
                }
            }


            row.push(
                <div className="key" key={letters[i]} style={{ backgroundColor: (correspondingColor === "#121213" ? "#737373" : correspondingColor) }}>
                    {letters[i]}
                </div >
            )
        }
        return row
    }

    const rowStyle = {
        justifyContent: "center",
        flexDirection: "row",
        display: "flex",
    }


    return (
        <center>
            <div style={rowStyle}>
                {renderRow("QWERTYUIOP")}
            </div>
            <div style={rowStyle}>
                {renderRow("ASDFGHJKL")}
            </div>
            <div style={rowStyle}>
                {renderRow("ZXCVBNM")}
            </div>
        </center>
    );

}

export default Keyboard;