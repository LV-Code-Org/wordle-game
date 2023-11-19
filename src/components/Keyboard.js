import React from "react";
import "../css/Keyboard.css"

const Keyboard = ({ usedLetters }) => {

    const renderRow = (letters) => {
        const row = []
        for (let i = 0; i < letters.length; i++) {
            row.push(
                <div class="key" key={letters[i]}>
                    {letters[i]}
                </div>
            )
        }
        return row
    }

    const rowStyle = (width) => {
        return {
            justifyContent: "center",
            flexDirection: "row",
            display: "flex",
        }
    }

    return (
        <center>
            <div style={rowStyle(35)}>
                {renderRow("QWERTYUIOP")}
            </div>
            <div style={rowStyle(30)}>
                {renderRow("ASDFGHJKL")}
            </div>
            <div style={rowStyle(24)}>
                {renderRow("ZXCVBNM")}
            </div>
        </center>
    );

}

export default Keyboard;