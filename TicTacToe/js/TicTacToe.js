// Keeps track of who's turn it is. 
let activePlayer = 'X';
// Stores an arry pof moves.  Used to determoine win conditions
let selectedSquares = [];

// For placing and X or an O in a square.
function placeXOrO(squareNumber) {
    //This condition ensures a square hasn't already been selected
    //The .some() method is used to check each element of selectedSquare array to
    //see if it contains the square number clicked on.
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        //Retrieves the html element id hat was clicked.
        let select = document.getElementById(squareNumber);
        //This condition checks whose turn it is.
        if (activePlayer === 'X') {
            //If activePlayer is equal to 'X' the x.png is placed in HTML.
            select.style.backgroundImage = 'url("images/x.png")';
        //Active player may oonly be 'X' or 'O' so, if not 'X' it must be 'O'
        } else {
            //If activePlayer os equal to 'O', the o.png is placed in HTML.
            select.style.backgroundImage = 'url("images/o.png")';
        }
        //squareNumber and activePlayer are concantenated together and added to array.
        selectedSquares.push(squareNumber + activePlayer);
        //This calls a function to check for any win conditions.
        checkWinConditions();
        //This condition is for changing active players.
        if (activePlayer === 'X') {
            //If active player is 'X' change it to 'O'.
            activePlayer = 'O';
        //If active player is anything other than 'X'.
        } else {
            //Change activePlayer to 'X'.
            activePlayer = 'X';
        }
        
        
        //This function plays placement sound.
        audio('./media/place.mp3');
        //This condition cheks to see if it is computers turn.
        if (activePlayer === 'O') {
            //This disables clicking for computer choice.
            disableClick();
            //This function waits 1 second before placing image
            //and enabling click.
            setTimeout(function () { computersTurn(); }, 1000);
        }
        //Returning true is needed for computersTurn() funcion to work.
        return true;
    }

    //This function results in a random square being selected.
    function computersTurn() {
        //This boolean is needed for the while loop.
        let success = false;
        //This variable stores a random number 0-8.
        let pickASquare;
        //This condition allows the while loop to keep
        //trying if a square is already selected.
        while(!success) {
            //A random number between 0 and 8 is selected.
            pickASquare = String(Math.floor(Math.random() * 9));
            //If the random number evaluates returns true, the square has not yet been selected.
            if (placeXOrO(pickASquare)) {
                //This line calls the function.
                placeXOrO(pickASquare);
                //This changes the boolean and ends the loop.
                success = true;
            };
        }
    }
 
} 

//This function parses the selectedSquares array to search for win conditions.
//drawWinLine function is called to draw line oif condition is met.
function checkWinConditions() {
    //X 0, 1, 2 condition.
    if       (arrayIncludes('0X', '1X', '2X')) {drawWinLines(50, 100, 558, 100) }
    //X 3, 4, 5 condition
    else if  (arrayIncludes('3X', '4X', '5X')) {drawWinLines(50, 304, 558, 304) }
    //X 6, 7, 8 condition.
    else if  (arrayIncludes('6X', '7X', '8X')) {drawWinLines(50, 508, 558, 508) }
    //X 0, 3, 6 condition.
    else if  (arrayIncludes('0X', '3X', '6X')) {drawWinLines(100, 50, 100, 558) }
    //X 1,4,7 condition.
    else if  (arrayIncludes('1X', '4X', '7X')) {drawWinLines(304, 50, 304, 558) }
    //X 2, 5, 8 condition.
    else if  (arrayIncludes('2X', '5X', '8X')) {drawWinLines(508, 50, 508, 558) }
    //X 6, 4, 2 condition. 
    else if  (arrayIncludes('6X', '4X', '2X')) {drawWinLines(100, 508, 510, 90) }
    //X 0, 4, 8 condition.
    else if  (arrayIncludes('0X', '4X', '8X')) {drawWinLines(100, 100, 520, 520) }
    //O 0, 1, 2 condition. 
    else if  (arrayIncludes('0O', '1O', '2O')) {drawWinLines(50, 100, 558, 100) }
    //O 3, 4, 5 condition. 
    else if  (arrayIncludes('3O', '4O', '5O')) {drawWinLines(50, 304, 558, 304) }
    //O 6, 7, 8 condition. 
    else if  (arrayIncludes('6O', '7O', '8O')) {drawWinLines(50, 508, 558, 508) }
    //O 0, 3, 6 condition. 
    else if  (arrayIncludes('0O', '3O', '6O')) {drawWinLines(100, 50, 100, 558) }
    //O 1, 4, 7 condition. 
    else if  (arrayIncludes('1O', '4O', '7O')) {drawWinLines(304, 50, 304, 558) }
    //O 2, 5, 8 condition. 
    else if  (arrayIncludes('2O', '5O', '8O')) {drawWinLines(508, 50, 508, 558) }
    //O 6, 4, 2 condition. 
    else if  (arrayIncludes('6O', '4O', '2O')) {drawWinLines(100, 508, 510, 90) }
    //O 0, 4, 8 condition. 
    else if  (arrayIncludes('0O', '4O', '8O')) {drawWinLines(100, 100, 520, 520) }
    //This condition checks for a tie.  If none of the above conditions register
    //and 9 squares are selected, the code executes. 
    else if (selectedSquares.length >= 9) {
        //This function plays the tie game sound. 
        audio('./media/tie.mp3');
        //This function sets a .3 second timer before the resetGame is called.
        setTimeout(function () { resetGame();}, 1000);
    }

    //This function checks if an array includes 3 strings. 
    //It is used to check for each win condition. 
    function arrayIncludes(squareA, squareB, squareC) {
        //The next 3 variables will be used to check for 3 in a row. 
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
        //If the 3 variables we pass are all included in the arrau true is
        //returned and the else if condition executes the drawWinLine function. 
        if (a === true &&  b === true && c === true) { return true; }
    }
}

//This function resets games in a tie or win.
function resetGame() {
    //This FOR loop iterates through each HTML square element. 
    for (let i  = 0; i < 9; i++) {
        //Variable gets element of i. 
        let square = document.getElementById(String(i));
        //Removes elements backgroundImage. 
        square.style.backgroundImage = '';
    }
    //Resets array so it is empty and game can start over. 
    selectedSquares = [];
}

//This function takes a string parameter from an earlier for
//placement sound ('./media/place.mp3')
function audio(audioURL) {
    //Creates new audio obkect and passes the pasth as parameter. 
    let audio = new Audio(audioURL);
    //Play method which plays audio sounds. 
    audio.play();
}

//Utilizes html canvas to draw win lines. 
function drawWinLines(coordX1, coordY1, coordX2, coordY2) {
    //Accesses html canvas element. 
    const canvas = document.getElementById('win-lines');
    //Gives access top methods and properties to use on canvas. 
    const c = canvas.getContext('2d');
    //Sets start lines for x axis. 
    let x1 = coordX1,
        //Sets start of y axis.
        y1 = coordY1,
        //Sets end of x axis. 
        x2 = coordX2,
        //Sets end of y axis. 
        y2 = coordY2,
        //Variable stores temporary x axis data updated in animation loop. 
        x = x1,
        //Variable stores temporary y axis data updated in animation loop. 
        y = y1;
    
    //Function interqacts with canvas. 
    function animateLineDrawing() {
        //Variable creates loop for game ending and restart. 
        const animateLoop = requestAnimationFrame(animateLineDrawing);
        //Clears content from last loop iteration. 
        c.clearRect(0, 0, 608, 608);
        //Method starts a new path. 
        c.beginPath();
        //Method moves to starting point for win line. 
        c.moveTo(x1, y1);
        //Method indicates end point of win line. 
        c.lineTo(x, y);
        //Sets win line width. 
        c.lineWidth =10;
        //Sets color of win line. 
        c.strokeStyle = 'rgba(70, 255, 33, .8)';
        //Method that draws out everythiong laid out above.
        c.stroke();
        //Condition that checks if endpoint has been reached. 
        if (x1 <= x2 && y1 <= y2) {
            //This condition adds 10 to previous end x point. 
            if (x < x2) { x += 10; }
            //This condition adds 10 to previous end y point. 
            if (y < y2) { y += 10; }
            //This condition cancels animation loop if end points are reached. 
            if (x >= x2 && y >= y2) { cancelAnimationFrame(animateLoop);}
        }
        //This condition is similar to above. 
        //Necessary for the 6, 4, 2 win condition.
        if (x1 <= x2 && y1 >= y2) {
            if (x < x2) { x += 10; }
            if (y > y2) { y -= 10; }
            if (x >= x2 && y <= y2) {cancelAnimationFrame(animateLoop);}
        }
    }

    //This function clears vanvas after win line is drawn. 
    function clear() {
        //This line starts animation loop. 
        const animateLoop = requestAnimationFrame(clear);
        //Clears the canvas.
        c.clearRect(0, 0, 608, 608);
        //Stops animation loop. 
        cancelAnimationFrame(animateLoop);
    }
    //This line disallows clicking while win sound is being played. 
    disableClick();
    //Plays win sound. 
    audio('./media/winGame.mp3');
    //Calls main animation loop.
    animateLineDrawing();
    //This line clears canvas, rersets game and allows clicking again after 1 second. 
    setTimeout(function() { clear(); resetGame(); }, 1000);
}

//Function makes body element temporarily unclickable.
function disableClick() {
    //This makes body unclickable.
    body.style.pointerEvents = 'none';
    //This makes body clickable again after 1 second. 
    setTimeout(function() {body.style.pointerEvents = 'auto';}, 1000);
}

