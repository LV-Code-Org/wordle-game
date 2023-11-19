import React from "react";
import "../css/Input.css"

const StaticInput = (props) => {
    return (
        <div className="wordle-input" style={{ animation: "bounce 1s" }}>
            {props.info.map((value, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={value[0]}
                    style={{ backgroundColor: value[1], border: `2px ${value[1] === '#121213' ? '#3c3c3c' : value[1]} solid` }}
                    readOnly={true}
                />
            ))}
        </div>
    );
}

export default StaticInput;
