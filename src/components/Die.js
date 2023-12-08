import React from "react";

const Die = (props) => {
    const heldstyle = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return(
        <button className="dice" onClick={props.holdFunc} style={heldstyle} >
            {props.value}
        </button>
    )
}

export default Die