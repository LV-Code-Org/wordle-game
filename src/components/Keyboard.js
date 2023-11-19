import React from "react";
import "../css/Keyboard.css"

const Keyboard = ({ usedLetters }) => {

    const renderRow = (letters) => {
        const row = []
        for (let i = 0; i < letters.length; i++) {
            row.push(
                <div className="key" key={letters[i]}>
                    {letters[i]}
                </div>
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