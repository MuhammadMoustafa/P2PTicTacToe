const LETTERS = {
    'X': 'x',
    'O': 'o'
}
class Player {
    constructor(letter) {
        this.letter = letter;
        if (letter === LETTERS.X) {
            this.score = 1;
        } else {
            this.score = -1;
        }
    }
}