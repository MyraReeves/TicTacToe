// Start the game with the player being first:
let activePlayer = 'X';

// Store an array of moves to determine who wins:
let selectedSquares = [];

// ========================================================================================================

// Check whether anyone has won:
function checkWinConditions() {

    // Check for a horizontal line of either all Xs or all Os across the TOP row. Draw a line if there is:
    if (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100) }
    else if (arrayIncludes('0O', '1O','2O')) {drawWinLine(50, 100, 558, 100)}

    // Check for a horizontal line of either all Xs or all Os across the MIDDLE row. Draw a line if there is:
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558, 304) }
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(50, 304, 558, 304) }

    // Check for a horizontal line of either all Xs or all Os across the BOTTOM row. Draw a line if there is: 
    else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508) }
    else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(50, 508, 558, 508) }

    // Check for a vertical line of either all Xs or all Os down the FIRST column. Draw a line if yes:
    else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558) }
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100, 50, 100, 558) }

    // Check for a vertical line of either all Xs or all Os down the SECOND column. Draw a line if yes:
    else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304, 50, 304, 558) }
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304, 50, 304, 558) }

    // Check for a vertical line of either all Xs or all Os down the THIRD column. Draw a line if yes:
    else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558) }
    else if (arrayIncludes('2O', '5O', '8O')) { drawWinLine(508, 50, 508, 558) }

    // Check for a FALLING diagonal line of all Xs or all Os. Draw a line if so:
    else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(100, 100, 520, 520) }
    else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(100, 100, 520, 520) }

    // Check for a RISING diagonal line of all Xs or all Os. Draw a line if so:
    else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 510, 90) }
    else if (arrayIncludes('6O', '4O', '2O')) { drawWinLine(100, 508, 510, 90) }

    // The game is tied, if none of the above conditions are met but all 9 squares have been selected:
    else if (selectedSquares.length >= 9) {
        Audio('./media/tie.mp3');
        // Reset the game:
        setTimeout(function () { resetGame(); }, 4000);
    }

    // Check for 3 strings in the array to check for each winning condition:
    function arrayIncludes(squareA, squareB, squareC) {
        // Check for 3 in a row:
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
        // if so, then execute the drawLine() function:
        if (a === true && b === true && c === true) {return true;}
    }
}


// =================================================================================================


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