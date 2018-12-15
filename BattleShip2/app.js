var express = require("express");
var http = require("http");
var websocket = require("ws")

var port = process.argv[2];
var app = express();

app.use(express.static(__dirname + "/public"));
http.createServer(app).listen(port);

app.get("/",function(req,res){
  res.sendFile("splash.html",{root: "./public"});
})