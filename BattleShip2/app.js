var express = require("express");
var http = require("http");
var websocket = require("ws")

var gameStatus = require("./statTracker");
var Game = require("./game");


var port = process.argv[2];
var app = express();

app.use(express.static(__dirname + "/public"));

app.get("/",function(req,res){
  res.sendFile("splash.html",{root: "./public"});
})

var server = http.createServer(app);
const wss = new websocket.Server({ server });

var websockets = {};//property: websocket, value: game

var currentGame = new Game(gameStatus.gamesInitialized++);
var connectionID = 0;//each websocket receives a unique ID

wss.on("connection",function connection(ws){

});

server.listen(port);