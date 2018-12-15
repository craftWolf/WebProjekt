var express = require("express");
var http = require("http");
var websocket = require("ws")

var indexRouter = require("./routes/index");
// var messages = require("./public/javascripts/messages");

var gameStatus = require("./statTracker");
var Game = require("./game");

var port = process.argv[2];
var app = express();


app.use(express.static(__dirname + "/public"));
http.createServer(app).listen(port);

app.get("/",function(req,res){
  res.sendFile("splash.html",{root: "./public"});
})

var server = http.createServer(app);
const wss = new websocket.Server({ server });

var websockets = {};//property: websocket, value: game

var currentGame = new Game(gameStatus.gamesInitialized++);
var connectionID = 0;//each websocket receives a unique ID

wss.on("connection", function connection(ws) {

  /*
   * two-player game: every two players are added to the same game
   */
  let con = ws;
  con.id = connectionID++;
  let playerType = currentGame.addPlayer(con);
  websockets[con.id] = currentGame;

  /*
   * inform the client about its assigned player type
   */
  // con.send((playerType == "A") ? messages.S_PLAYER_A : messages.S_PLAYER_B);

})