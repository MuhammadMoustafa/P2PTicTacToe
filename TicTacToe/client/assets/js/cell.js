class Cell {

    static cellsPerRow = 3;
    static cellsPerCol = 3;
    static cellWidth = undefined;
    static cellHeight = undefined;
    static isGoalReached = false;
    static grid = [];

    constructor(rowIndex, colIndex) {
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.startX = this.colIndex * Cell.cellWidth;
        this.startY = (Cell.cellsPerCol + this.rowIndex) * Cell.cellHeight;
        this.index = Cell.getIndex(rowIndex, colIndex);
        this.letter = undefined;
    }

    static setCellWidth(width) {
        Cell.cellWidth = floor(width / Cell.cellsPerRow);
    }
    static setCellHeigth(height) {
        Cell.cellHeight = floor(height / Cell.cellsPerCol);
    }


    isNotVisited(index) {
        return !Cell.grid[index].isVisted;
    }

    static getIndex(x, y) {
        if ((x === Cell.cellsPerRow) || (x < 0) || (y === Cell.cellsPerCol) || (y < 0)) {
            return undefined;
        } else {
            return (x * Cell.cellsPerRow + y);
        }
    }
    checkNeighbors() {
        let neighbors = [];

        let bottomIndex = Cell.getIndex(this.rowIndex + 1, this.colIndex);
        //console.log("bottom index", bottomIndex);
        if (bottomIndex && this.isNotVisited(bottomIndex)) { // check for bottom boundary
            neighbors.push(Cell.grid[bottomIndex]);
        }

        let topIndex = Cell.getIndex(this.rowIndex - 1, this.colIndex);
        //console.log("top index", topIndex);
        //console.log((this.rowIndex - 1) * Cell.cellsPerRow + this.colIndex);
        if (topIndex && this.isNotVisited(topIndex)) { // check for top boundary
            //console.log(Cell.grid[topIndex]);
            neighbors.push(Cell.grid[topIndex]);
        }

        let rightIndex = Cell.getIndex(this.rowIndex, this.colIndex + 1);
        //console.log("right index", rightIndex);
        if (rightIndex && this.isNotVisited(rightIndex)) { // check for right boundary
            neighbors.push(Cell.grid[rightIndex]);
        }

        let leftIndex = Cell.getIndex(this.rowIndex, this.colIndex - 1);
        //console.log("left index", leftIndex);
        if (leftIndex && this.isNotVisited(leftIndex)) { // check for left boundary
            neighbors.push(Cell.grid[leftIndex]);
        }
        return neighbors;
    }

    show() {
        rect(this.startX, this.startY, Cell.cellWidth, Cell.cellHeight);
        if (this.letter) {
            textAlign(CENTER, CENTER);
            textSize(160);
            text(this.letter, this.startX + 0.5 * Cell.cellWidth, this.startY + 0.5 * Cell.cellHeight);
        }
    }


    onClick(posX, posY) {
        if (posX > this.startX && posX < this.startX + Cell.cellWidth && posY > this.startY && posY < this.startY + Cell.cellHeight) {
            return this.index;
        } else {
            return undefined;
        }
    }


    removeWall(neighbor) {
        if (neighbor.rowIndex - this.rowIndex === 1) { // bottom neighbor
            this.boundaries.bottom = false;
            neighbor.boundaries.top = false;
        } else if (neighbor.rowIndex - this.rowIndex === -1) { // top neighbor
            this.boundaries.top = false;
            neighbor.boundaries.bottom = false;
        } else if (neighbor.colIndex - this.colIndex === 1) { // right neighbor
            this.boundaries.right = false;
            neighbor.boundaries.left = false;
        } else if (neighbor.colIndex - this.colIndex === -1) { // left neighbor
            this.boundaries.left = false;
            neighbor.boundaries.right = false;
        }
    }
}