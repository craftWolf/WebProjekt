/* every game has two players, identified by their WebSocket */
var game = function (gameID) {
    this.playerA = null;
    this.playerB = null;
    this.id = gameID;
    this.playerACells = null;
    this.playerBCells = null;
    this.gameState = "0 JOINT"; //"A" means A won, "B" means B won, "ABORTED" means the game was aborted
};

/*
 * The game can be in a number of different states.
 */
game.prototype.transitionStates = {};
game.prototype.transitionStates["0 JOINT"] = 0;
game.prototype.transitionStates["1 JOINT"] = 1;
game.prototype.transitionStates["2 JOINT"] = 2;
game.prototype.transitionStates["A HIT"] = 3;
game.prototype.transitionStates["B HIT"] = 4;
game.prototype.transitionStates["A MISSED"] = 5;
game.prototype.transitionStates["B MISSED"] = 6;
game.prototype.transitionStates["A"] = 7; //A won
game.prototype.transitionStates["B"] = 8; //B won
game.prototype.transitionStates["ABORTED"] = 9;







module.exports = game;