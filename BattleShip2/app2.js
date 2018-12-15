var util = require("util"),
    io = require("socket.io");

var socket,
    players;

function init() {
    players = [];
};

socket.configure(function() {
    socket.set("transports", ["websocket"]);
    socket.set("log level", 2);
});



// EXECUTION
init();

socket = io.listen(8000);