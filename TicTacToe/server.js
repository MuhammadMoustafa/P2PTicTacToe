let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

let player1, player2, currentPLayer;

app.use(express.static('client'));

/*
app.get('/', function (req, res) {
    console.log(__dirname);
    res.sendFile(__dirname + '/client/index.html');
});
*/
io.on('connection', function (socket) {
    console.log('a user connected ' + socket.id);
    if (!player1) {
        player1.sokcet = socket;
        player1.letter = 'X'
        socket.client.emit('wait', 'Waiting for the other opponent');

    } else if (!player2) {
        player2.socket = socket;
        player2.letter = 'O'
        currentPLayer = player1;
        socket.emit('ready', 'Player 1 turn');
    }

    socket.on('play', data => {
        console.log(data);
        if (player1 && player2) {
            socket.broadcast.emit('play', data);
        }
    })
});



http.listen(3000, function () {
    console.log('listening on *:3000');
});