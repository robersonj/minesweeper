export class Board {

    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }

    // Add a playerBoard() Getter Method
    get playerBoard() {
        return this._playerBoard;
    }

    //Add flipTile() to the Board Class
    flipTile(rowIndex, columnIndex) {

        if (this._playerBoard[rowIndex][columnIndex] === 'F') {
            console.log('This tile is flagged as a bomb and cannot be flipped.');
            return;
        }

        if (this._bombBoard[rowIndex][columnIndex] === 'B') {
            this._playerBoard[rowIndex][columnIndex] = 'B';
        } else {
            this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
            if (this.getNumberOfNeighborBombs(rowIndex, columnIndex) === 0) {
              this.flipNeighborTiles(rowIndex, columnIndex);

            }


        }

        this._numberOfTiles--;

    }

    flipNeighborTiles(rowIndex, columnIndex) {
        const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
        const numberOfRows = this._bombBoard.length;
        const numberOfColumns = this._bombBoard[0].length;
        neighborOffsets.forEach(offset => {
            const neighborRowIndex = rowIndex + offset[0];
            const neighborColumnIndex = columnIndex + offset[1];
            if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
                this.flipTile(neighborRowIndex, neighborColumnIndex);
            }
        });
    }


    // Add getNumberOfNeighborBombs() to the Board Class
    getNumberOfNeighborBombs(rowIndex, columnIndex) {
        const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
        const numberOfRows = this._bombBoard.length;
        const numberOfColumns = this._bombBoard[0].length;
        let numberOfBombs = 0;
        neighborOffsets.forEach(offset => {
            const neighborRowIndex = rowIndex + offset[0];
            const neighborColumnIndex = columnIndex + offset[1];
            if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
                if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                    numberOfBombs++;
                }
            }
        });
        return numberOfBombs;
    }

    // Check for Safe Tiles
    hasSafeTiles() {
        return this._numberOfTiles !== this._numberOfBombs;
    }

    // Update printBoard() (this was verified from Codecademy)
    print() {
        console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
    }

    // Add & Update generatePlayerBoard
    static generatePlayerBoard(numberOfRows, numberOfColumns) {
        let board = [];
        for (let i = 0; i < numberOfRows; i++) {
            let row = [];
            for (let j = 0; j < numberOfColumns; j++) {
                row.push(' ');
            }
            board.push(row);
        }
        return board;
    }

    // Add & Update generateBombBoard()
    static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
        let board = [];

        // Functionality for logical board size/number of bombs
        if (numberOfBombs >= (numberOfRows * numberOfColumns)) {
            console.log('ERROR! You cannot have more bombs than playable tiles.')
        } else if (numberOfBombs >= (numberOfRows * numberOfColumns) / 2) {
            console.log('Please choose a number of bombs that is less than half the amount of playable tiles.')
        }
        for (let i = 0; i < numberOfRows; i++) {
            let row = [];
            for (let j = 0; j < numberOfColumns; j++) {
                row.push(null);
            }
            board.push(row);
        }


        let numberOfBombsPlaced = 0;
        while (numberOfBombsPlaced < numberOfBombs) {
            let randomRowIndex = Math.floor(Math.random() * numberOfRows);
            let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
            if (board[randomRowIndex][randomColumnIndex] !== 'B') {
                board[randomRowIndex][randomColumnIndex] = 'B';
                numberOfBombsPlaced++;
            }
        }

        return board;
    }

}
