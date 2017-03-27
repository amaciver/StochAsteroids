const Game = require('./game.js');
// const Keymaster = require('../keymaster.js');
// const Ship = require('./ship.js');

function GameView(ctx) {
  this.game = new Game();
  this.ctx = ctx;
}

GameView.prototype.start = function () {
  setInterval(() => {
    // this.bindKeyHandlers();
    // this.game.checkCollisons();
    this.game.moveObjects();
    this.game.draw(this.ctx);
  }, 20);
};

module.exports = GameView;
