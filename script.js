"use strict";

// Player constructor function
class Player {
    constructor(sign) {
        // Define the sign properties for each player instance
        this.sign = sign;

        const getSign = () => {
            return sign;
        };
        return {
            getSign,
        };
    }
}

// Game board module
const gameBoard = (() => {
    // Array representing the game board
    const board = ["", "", "", "", "", "", "", "", ""];

    // Set the field at the specified index to the specified sign
    const setField = (index, sign) => {
        if (index > board.length) return;
        board[index] = sign;
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
        reset,
    };
})();

// Display control module
const displayControl = (() => {
    // Get the DOM elements for the game board fields, message element and restart button
    const fieldElements = document.querySelectorAll(".field");
    const messageElement = document.getElementById("message");
    const restartButton = document.getElementById("restart");

    // Add event listeners to the game board fields
    fieldElements.forEach((field) =>
        field.addEventListener("click", (e) => {
            // If the game is over or the field is already taken, do nothing
            if (gameControl.getIsOver() || e.target.textContent !== "") return;
            // Play the round with the field index
            gameControl.playRound(parseInt(e.target.dataset.index));
            // Update the game board display
            updateGameBoard();
        })
    );

    // Add an event listener to the restart button
    restartButton.addEventListener("click", (e) => {
        // Reset the game board and game controller
        gameBoard.reset();
        gameControl.reset();
        resetMessageColor();
        // Update the game board display
        updateGameBoard();
        // Set the message element to "Player X's turn"
        setMessageElement("Player X's turn");
        resetMessageColor();
    });

    // Update the game board display by setting the text content of each field element to the corresponding field in the game board
    const updateGameBoard = () => {
        for (let i = 0; i < fieldElements.length; i++) {
            fieldElements[i].textContent = gameBoard.getField(i);

            // If the field has the player O's sign, set the color to red
            if (fieldElements[i].textContent === "O") {
                fieldElements[i].style.color = "#E23F3F";
            }
            // If the field has the player X's sign, set the color to yellow
            if (fieldElements[i].textContent === "X") {
                fieldElements[i].style.color = "#F5CA14";
            }
        }
    };

    // Change the color of the the text according to the winner's color
    const getColorForWinner = (winner) => {
        if (winner === "O") {
            return "#E23F3F";
        } else {
            return "#F5CA14";
        }
    };

    // reset the color of the text to original color
    const resetMessageColor = () => {
        messageElement.style.color = "";
    };

    // Set the result message based on the winner
    const setResultMessage = (winner) => {
        if (winner === "Draw") {
            setMessageElement("It's a draw!");
        } else {
            setMessageElement(`Player ${winner} has won!`);
            messageElement.style.color = getColorForWinner(winner);
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

// Game control module
const gameControl = (() => {
    // Create player instance
    const playerX = new Player("X");
    const playerO = new Player("O");

    // Initialize the round counter and isOver flag
    let round = 1;
    let isOver = false;

    // Play the round with specified field index
    const playRound = (fieldIndex) => {
        // Set the field at the specified index to the current player's sign
        gameBoard.setField(fieldIndex, getCurrentPlayerSign());
        // Check if the current player has won
        if (checkWinner(fieldIndex)) {
            // If the current player has won, set the result message and set the isOver flag to true
            displayControl.setResultMessage(getCurrentPlayerSign());
            isOver = true;
            return;
        }
        // If all rounds have been played and no winner has been found, set the result message to "Draw"
        if (round === 9) {
            displayControl.setResultMessage("Draw");
            isOver = true;
            return;
        }
        // If the game is not over, increment the round counter and set the message element to the next player's turn
        round++;
        displayControl.setMessageElement(`Player ${getCurrentPlayerSign()}'s turn`);
    };

    // Get the sign of the current player
    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
    };

    // Check if the current player has won with specified field index
    const checkWinner = (fieldIndex) => {
        // Array of win conditions
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        // Filter the win conditions array to include only those that include the specified field index
        // Check if any of the filtered combinations meet the win condition (all fields are occupied by the current player's sign)
        return winConditions
            .filter((combination) => combination.includes(fieldIndex))
            .some((possibleCombination) =>
                possibleCombination.every(
                    (index) => gameBoard.getField(index) === getCurrentPlayerSign()
                )
            );
    };

    // Get the value of the isOver flag
    const getIsOver = () => {
        return isOver;
    };

    // Reset the isOver flag and counter
    const reset = () => {
        round = 1;
        isOver = false;
    };

    // Return an object with playRound, getIsOver, and reset methods
    return {
        playRound,
        getIsOver,
        reset,
    };
})();