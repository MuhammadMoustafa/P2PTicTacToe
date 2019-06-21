class Game {

    constructor() {
        this.player1 = new Player(LETTERS.X);
        this.player2 = new Player(LETTERS.O);
        this.currentPlayer = this.player1;
        this.currentGameState = GameStates.CONTINUE;
        this.clickedSqaures = 0;
        this.grid = [];
        this.rows = [0, 0, 0];
        this.cols = [0, 0, 0];
        this.leftDiag = 0;
        this.rightDiag = 0;

        for (var i = 0; i < 9; i++) {
            this.grid.push(new Cell(int(i / 3), i % 3));
        }
    }

    showBoard() {
        this.grid.forEach(cell => {
            cell.show();
        });
    }

    tooglePlayers() {
        if (this.currentPlayer === this.player1) {
            this.currentPlayer = this.player2;
        } else if (this.currentPlayer === this.player2) {
            this.currentPlayer = this.player1;
        }
    }

    getCellIndexOnClick(posX, posY) {
        let index = undefined;
        this.grid.forEach(element => {
            let temp = element.onClick(posX, posY);
            index = isNaN(temp) ? index : temp;
        });
        return index;
    }

    isValidIndex(index) {
        return (!isNaN(index) && !this.grid[index].letter);
    }
    /*
        play(posX, posY) {
            if (this.currentGameState !== GameStates.CONTINUE) {
                return this.currentGameState;
            }

            let cell = undefined;
            this.grid.forEach(element => {
                cell = cell || element.onClick(posX, posY);
                //console.log("asdjfkl", index);
            });
            return this.update(this.currentPlayer, cell);
        }
    */
    update(player, index) {
        this.grid[index].letter = player.letter;
        this.clickedSqaures += 1;
        game.tooglePlayers();
        return this.gameState(player.score, this.grid[index]);
    }

    chechForWin(element, score) {
        element += score;
        if (abs(element) === 3) {
            this.currentGameState = GameStates.WIN;
        }
        return element;
    }

    gameState(score, cell) {

        this.rows[cell.rowIndex] = this.chechForWin(this.rows[cell.rowIndex], score);
        this.cols[cell.colIndex] = this.chechForWin(this.cols[cell.colIndex], score);

        if (cell.rowIndex === cell.colIndex) {
            this.leftDiag = this.chechForWin(this.leftDiag, score)
        }

        if (cell.rowIndex + cell.colIndex === 2) {
            this.rightDiag = this.chechForWin(this.rightDiag, score)
        }

        if (this.clickedSqaures === 9 && this.currentGameState === GameStates.CONTINUE) {
            this.currentGameState = GameStates.DRAW;
        }
        return this.currentGameState;
    }

}