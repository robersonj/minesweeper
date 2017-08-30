
//INSTRUCTIONS:
//
//To play Minewsweeper, we will create instances of the Minesweeper Game in the Command Line. If you are unfamiliar with how to play Minesweeper, please search the rules on your favorite search engine.
//
//To play the game:
//
//(1) navigate to the lib directory of the minesweeper game directory and run `node`. You will see the lib/game.js file loaded in the command line.
//
//(2) Run `.load game.js` to load the contents of this file.
//
//(3) Then create a game instance: `let game = new Game(x, y, z);`, where x = number of rows you want to have, z = number of columns you want to have, and z = number of bombs you want to have. For example, `let game = new Game(10, 10, 10);` will create a 10 x 10 grid (100 squares) with 10 bombs randomly placed.
//
//(4) Run commands like so:
//
//    TO FLIP TILE:
//    
//    To flip a tile, run `game.playMove(x, y);` where x = the row index and y = the column index. For example, `game.playMove(0, 0);` will flip the first tile on the upper left, at index (0, 0). 
//
//    TO FLAG A TILE:
//    
//    To flag a tile, use the same method from above except run `game.toggleFlag(x, y);` where x = the row index and y = the column index. For example, 'game.toggleFlag(0, 0);` will flag the first tile on the upper left, at index (0, 0). To unflag a tile, simply run a the same command with the same row index and column index passed into the parenthesis. For example, if you ran `game.toggleFlag(0, 0);` and want to unflag it, run `game.toggleFlag(0, 0);` again to remove the flag.
//
//(5) The game will end in two ways:
//    
//    (1) You flip a tile that has a bomb ('B').
//    
//    (2) You flip all tiles on the board that are not bombs. (Flagging all bombs is currently not necessary, though recommended.)
//
//(6) When done, run `.exit`.


import {Board} from './board';

class Game {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._numberOfBombs = numberOfBombs;
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }

//    get numberOfBombs() {
//        return this._numberOfBombs;
//    }
    
    playMove(rowIndex, columnIndex) {
        this._board.flipTile(rowIndex, columnIndex);
        if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
            console.log('Boom! Sorry, game over. Final game board:');
            this._board.print();
        } else if (this._board.playerBoard[rowIndex][columnIndex] === undefined) {
            console.log(`The tile at [${rowIndex}, ${columnIndex}] does not exist on this board.`);
            this._board.print();
        } else if (!this._board.hasSafeTiles()) {
            console.log('Congrats! You have won the game!')
            this._board.print();
        } else {
            if (this._board.playerBoard[rowIndex][columnIndex] === 1) {
                console.log(`Position [${rowIndex}, ${columnIndex}]:`);
                console.log(`there is ${this._board.playerBoard[rowIndex][columnIndex]} bomb around you.`);
                console.log(`Number of bombs remaining: ${this._numberOfBombs}`);
                this._board.print();
            } else {
                console.log(`Position [${rowIndex}, ${columnIndex}]:`);
                console.log(`There are ${this._board.playerBoard[rowIndex][columnIndex]} bombs around you.`);
                console.log(`Number of bombs remaining: ${this._numberOfBombs}`);
                this._board.print();
            }
        }
    }
    
    toggleFlag(rowIndex, columnIndex) {
        if (this._board.playerBoard[rowIndex][columnIndex] === ' ') {
            this._board.playerBoard[rowIndex][columnIndex] = 'F';
            this._numberOfBombs--;
            if (this._numberOfBombs === '1') {
                console.log(`There is ${this._numberOfBombs} remaining.`);
                this._board.print();
            } else {
                console.log(`There are ${this._numberOfBombs} bombs remaining.`);
                this._board.print();
            }
        } else if (this._board.playerBoard[rowIndex][columnIndex] === 'F') {
            this._board.playerBoard[rowIndex][columnIndex] = ' ';
            this._numberOfBombs++;
            console.log(`There are ${this._numberOfBombs} bombs remaining.`)
            this._board.print();
        } else if (this._board.playerBoard[rowIndex][columnIndex] !== 'F' && this._board.playerBoard[rowIndex][columnIndex] !== ' '){
            console.log('This tile has already been flipped and cannot be flagged.');
            this._board.print();
        }
    }
   
}