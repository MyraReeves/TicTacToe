
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

        // Play sound effect:
        Audio('./media/place.mp3');

        // If it is the computer's turn, disable clicking and pause:
        if (activePlayer === 'O') {
            disableClick();
            setTimeout(function () { computersTurn(); } , 1000);
        }
        return true;
    }


    // Have the computer chose a square at random on its turn:
    function computersTurn() {
        let success = false;
        let pickASquare;
        while (!success) {
            // Choose a random number between 0 and 8 to select that square:
            pickASquare = String(Math.floor(Math.random() * 9));

            // Check whether the square has been selected already and if not, then place the O mark there:
            if(place_X_or_O(pickASquare)) {
                place_X_or_O(pickASquare);
                success = true;
            };
        }
    }
}