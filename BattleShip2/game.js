/* every game has two players, identified by their WebSocket */
var game = function (gameID) {
    this.playerA = null;
    this.playerB = null;
    this.id = gameID;
    this.playerCount = 0;
    this.maxPlayers = 2;
};


game.prototype.addPlayer = function (p) {
    console.assert(p instanceof Object, "%s: Expecting an object (WebSocket), got a %s", arguments.callee.name, typeof p);
    var playerAssigned = null;

    if (this.playerCount === this.maxPlayers) {
        return new Error("Invalid call to addPlayer, game is full");
    }

    if (this.playerA == null) {
        this.playerA = p;
        playerAssigned = "A";
    }
    else {
        this.playerB = p;
        playerAssigned = "B";
    }
    this.playerCount++;
    return playerAssigned;
}

game.prototype.hasTwoConnectedPlayers = function () {
    return (this.playerCount === this.maxPlayers);
};

module.exports = game;