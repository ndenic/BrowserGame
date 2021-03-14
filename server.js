// dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var port = 8082;
var players = {};

var app = express();
var server = http.Server(app);
var io = socketIO(server);
app.set('port', port);

//
app.use('/public', express.static(__dirname + "/public"));

// tbr ako zatvaras iz console umesto ctrl z koristi ctrl c da pozoves SIGQUIT :) ako ne mora posle ubivas preko pid
server.listen(port, function () {
    console.log("I'm listening");
});

app.get("/", function (request, response) {
    response.sendFile(path.join(__dirname, "landing.html"));
});

io.on('connection', function (socket) {
    console.log("New user has connected!");
    players[socket.id] = {
        player_id: socket.id,
        x: 500,
        y: 500
    }
    socket.emit('actualPlayers', players);

    socket.broadcast.emit('new_player', players[socket.id]);

    socket.on('disconnect', function () {
        console.log("User has disconnected!");
        delete players[socket.id];

        socket.broadcast.emit('player_disconnect', socket.id);
    });
});