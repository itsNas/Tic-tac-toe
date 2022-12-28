// The project will have at least 3 modules which are gameBoard, gameControl, and displayControl.

// create a gameBoard module with 3 methods for setField, getField and reset.

//  setField will have 2 parameters(index, sign) and will set the value of the field. If the index is our of range, it will do nothing.

// getField method will return the value of the field at the given index. If the index is out of range, it will return undefined.

// reset method will reset the board to the initial state with empty strings.

// displayControl method will have click eventListeners for fieldElements and restartButton and 3methods for updateGameBoard, setResultMessage and setResultElement.

"use strict";

const Player = (sign) => {
    this.sign = sign;

    const getSign = () => {
        return sign;
    };
    return {
        getSign,
    };
};

// The gameBoard function represents an array of 9 empty strings at start
const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    // This method set value of the field
    const setField = (index, sign) => {
        if (index > board.length) return;
        board[index] = sign
    };

    // This method will return the value of the field
    const getField = (index) => {
        if (index > board.length) return;
        return board[index];
    };

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    return {
        setField,
        getField,
        reset
    };
})();

const displayControl = (() => {})();

const gameControl = (() => {})();