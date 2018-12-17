var express = require("express");
var http = require("http");
var websocket = require("ws");
var Game = require("./game");
var gameStatus = require("./statTracker");
var Stats = require("./public/javascripts/stats");


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
var onlineStats = new Stats();

wss.on('connection', function connection(ws) {

  let con = ws;

  con.id = connectionID++;
  let playerType = currentGame.addPlayer(con);
  websockets[con.id] = currentGame;


  con.send(JSON.stringify({ data: playerType }));

  if (currentGame.hasTwoConnectedPlayers()) {
    currentGame = new Game(gameStatus.gamesInitialized++);
    onlineStats.players+=2;
  }
  

  con.on("message", function incoming(message) {
    let oMsg = JSON.parse(message);

    let gameObj = websockets[con.id];
    let isPlayerA = (gameObj.playerA == con) ? true : false;

    if (isPlayerA) {
      gameObj.playerB.send(message);
    } else {
      gameObj.playerA.send(message);
    }
  });

  con.on('close', function (code) {

    let gameObj = websockets[con.id];
    console.log(con.id + " disconnected ...");
    try {
      gameObj.playerA.close();
      gameObj.playerA = null;
    }
    catch (e) {
      console.log("Player A closing: " + e);
    }

    try {
      gameObj.playerB.close();
      gameObj.playerB = null;
    }
    catch (e) {
      console.log("Player B closing: " + e);
    }
  });
  
});
