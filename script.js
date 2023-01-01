"use strict";

// Player constructor function
const Player = (sign) => {
    // Define the sign properties for each player instance
    this.sign = sign;

    const getSign = () => {
        return sign;
    };
    return {
        getSign,
    };
};

// Game board module
const gameBoard = (() => {
    // Array representing the game board
    const board = ["", "", "", "", "", "", "", "", ""];

    // Set the field at the specified index to the specified sign
    const setField = (index, sign) => {
        if (index > board.length) return;
        board[index] = sign
    };

    // Get the field at the specified index
    const getField = (index) => {
        if (index > board.length) return;
        return board[index];
    };

    // Reset the game board by setting all the fields to an empty string
    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    // Return an object with setField, getField and reset methods
    return {
        setField,
        getField,
        reset
    };
})();

// Display control module
const displayControl = (() => {
    // Get the DOM elements for the game board fields, message element and restart button
    const fieldElements = document.querySelectorAll(".field");
    const messageElement = document.getElementById("message");
    const restartButton = document.getElementById("restart");

    fieldElements.forEach((field) =>
        field.addEventListener("click", (e) => {
            // If the game is over or the field is already taken, do nothing
            if (gameController.getIsOver() || e.target.textContent !== "") return;
            // Play the round with the field index
            gameController.playRound(parseInt(e.target.dataset.index));
            // Update the game board display
            updateGameBoard();
        })
    );

    // Add an event listener to the restart button
    restartButton.addEventListener("click", (e) => {
        // Reset the game board and game controller
        gameBoard.reset();
        gameController.reset();
        // Update the game board display
        updateGameBoard();
        // Set the message element to "Player X's turn"
        setMessageElement("Player X's turn");
    });

    // Update the game board display by setting the text content of each field element to the corresponding field in the game board
    const updateGameBoard = () => {
        for (let i = 0; i < fieldElements.length; i++) {
            fieldElements[i].textContent = gameBoard.getField(i);
        }
    };

    // Set the result message based on the winner
    const setResultMessage = (winner) => {
        if (winner === "Draw") {
            setMessageElement("It's a draw!");
        } else {
            setMessageElement(`Player ${winner} has won!`);
        }
    };

    // Set the text content of the message element
    const setMessageElement = (message) => {
        messageElement.textContent = message;
    };

    // Return an object with setResultMessage and setMessageElement methods
    return {
        setResultMessage,
        setMessageElement,
    };
})();

const gameControl = (() => {})();