// dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var port = 8082;

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