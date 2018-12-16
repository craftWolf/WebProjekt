// var express = require("express");
// var http = require("http");
// var websocket = require("ws")

// var gameStatus = require("./statTracker");
// var Game = require("./game");


// var port = process.argv[2];
// var app = express();

// app.use(express.static(__dirname + "/public"));

// app.get("/",function(req,res){
//   res.sendFile("splash.html",{root: "./public"});
// })

// var server = http.createServer(app);
// const wss = new websocket.Server({ server });

// var websockets = {};//property: websocket, value: game

// var currentGame = new Game(gameStatus.gamesInitialized++);
// var connectionID = 0;//each websocket receives a unique ID

// wss.on("connection",function connection(ws){

// });

// server.listen(port);


var express = require("express");
var http = require("http");
var websocket = require("ws");
var Game = require("./game");
var gameStatus = require("./statTracker");


var port = process.argv[2];
var app = express();

app.use(express.static(__dirname + "/public"));
var server = http.createServer(app).listen(port);

app.get("/", function (req, res) {
  res.sendFile("splash.html", { root: "./public" });
});

const wss = new websocket.Server({ server });

var connectionID = 0; //unique ID per websocket
var websockets = {};
var currentGame = new Game(gameStatus.gamesInitialized++);

wss.on('connection', function connection(ws) {

  let con = ws;

  con.id = connectionID++;
  let playerType = currentGame.addPlayer(con);
  websockets[con.id] = currentGame;


  con.send(JSON.stringify({ data: playerType }));

  if (currentGame.hasTwoConnectedPlayers()) {
    currentGame = new Game(gameStatus.gamesInitialized++);
  }

  con.on("message", function incoming(message) {
    let oMsg = JSON.parse(message);

    let gameObj = websockets[con.id];
    let isPlayerA = (gameObj.playerA == con) ? true : false;

    if (isPlayerA) {
      gameObj.playerB.send(message);
      gameObj.playerA.send(alert("me"))
    } else {
      gameObj.playerA.send(message);
    }
  });

  con.on("close", function (code) {

  });
});
