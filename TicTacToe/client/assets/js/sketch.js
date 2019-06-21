let socket;

const GameStates = {
	CONTINUE: 'continue',
	DRAW: 'draw',
	WIN: "win",
	INVALID: "invalid"
	//Player2Won: "player 2 won"
};

let game = undefined;

function setup() {

	const width = windowWidth / 2;
	const height = windowHeight / 2;
	Cell.setCellWidth(width);
	Cell.setCellHeigth(height);

	createCanvas(windowWidth, windowHeight);
	background(0);
	game = new Game();
	game.showBoard();

	socket = io.connect('ip:port');
	socket.on('play', onPlay);

}

wait = data => {
	console.log()
}

function onPlay(data) {
	let index = data.index;
	if (game.isValidIndex(index) && game.currentGameState === GameStates.CONTINUE) {
		game.update(game.currentPlayer, index);
	}
}

function mouseClicked() {
	index = game.getCellIndexOnClick(mouseX, mouseY);
	if (game.isValidIndex(index) && game.currentGameState === GameStates.CONTINUE) {
		game.update(game.currentPlayer, index);
		console.log('emit?');
		let data = {
			index: index
		};
		console.log(data);
		socket.emit('play', data);
	} else {
		console.log('invalid cell');
	}

	console.log(game.currentGameState);
}

function draw() {
	game.showBoard();
}