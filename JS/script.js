
// Keep track of whose turn it is:
let activePlayer = 'X';

// Store an array of moves to determine who wins:
let selectedSquares = [];

function place_X_or_O(spaceNumber) {
    // Check whether the square has already been selected before, using .some method to check the array for the space number
    if (!selectedSquares.some(element => element.includes(spaceNumber))) {

        // Retrieve the HTML element id that was clicked on:
        let select = document.getElementById(spaceNumber);

        // Place the current player's mark inside the square:
        if (activePlayer === 'X') {
            select.style.backgroundImage = 'url("images/x.png")';
        }
        else {
            select.style.backgroundImage = 'url("images/o.png")';
        }

        // Log the activePlayer and the selected square into the array:
        selectedSquares.push(spaceNumber + activePlayer);

        // Check whether anyone has won:
        checkWinConditions();

        // Change which player's turn it is:
        if (activePlayer === 'X') {
            activePlayer = 'O';
        }
        else {
            activePlayer = 'X';
        }
    }


}