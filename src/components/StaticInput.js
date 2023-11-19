import React from "react";
import "../css/Input.css"

const StaticInput = (props) => {
    return (
        <div className="wordle-input">
            {props.info.map((value, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={value[0]}
                    style={{ backgroundColor: value[1] }}
                    readOnly={true}
                />
            ))}
        </div>
    );
}

export default StaticInput;
