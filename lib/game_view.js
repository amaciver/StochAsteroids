const Game = require('./game.js');
const Drawer = require('./drawer.js');
const Asteroid = require('./asteroid.js');
const Util = require('./utils.js');

function GameView(ctx) {
  this.game = new Game();
  this.drawer = new Drawer(this.game, ctx)
  this.ctx = ctx;
  // this.mousePos = [];
  this.currPos = [];
  this.startPos = [];
}

GameView.prototype.start = function () {



  const canvasEl = document.querySelector('canvas');

  canvasEl.onmouseup = (e) => {
    this.currPos = [e.x, e.y];
    console.log(this.mousePos);
    const radius = Util.distance(this.startPos, this.currPos);
    // this.drawer.beginCircle(this.ctx, this.startPos, this.currPos);
    canvasEl.onmousemove = () => {};
    this.game.asteroids.push(new Asteroid(this.startPos, this.game, radius))
  }

  canvasEl.onmousedown = (e) => {
    this.startPos = [e.x,e.y];
    canvasEl.onmousemove = (e) => {
      this.currPos = [e.x,e.y]
      this.drawer.beginCircle(this.ctx, this.startPos, this.currPos)
    };
    // this.drawer.beginCircle(this.ctx, [e.x,e.y], this.mousePos)

  }
  setInterval(() => {
    this.game.moveObjects();
    this.game.draw(this.ctx);
  }, 20);
};



module.exports = GameView;
