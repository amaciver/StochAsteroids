const Game = require('./game.js');
const Drawer = require('./drawer.js');
const Asteroid = require('./asteroid.js');
const Util = require('./utils.js');

function GameView(ctx) {
  this.game = new Game();
  this.drawer = new Drawer(this.game, ctx)
  this.ctx = ctx;
  // this.canvas = document.getElementById('canvas');
  // this.rect = canvasEl.getBoundingClientRect());
  this.currPos = [];
  this.startPos = [];
}

GameView.prototype.start = function () {



  const canvasEl = document.querySelector('canvas');

  canvasEl.onmouseup = (e) => {
    const canvasEl = document.getElementById('canvas');
    const rect = canvasEl.getBoundingClientRect();
    this.currPos = [e.x - rect.left, e.y-rect.top];
    const radius = Util.distance(this.startPos, this.currPos);
    canvasEl.onmousemove = () => {};
    canvasEl.onmouseover = () => {};
    this.game.asteroids.push(new Asteroid(this.startPos, this.game, radius))
  }

  canvasEl.onmousedown = (e) => {
    const canvasEl = document.getElementById('canvas');
    const rect = canvasEl.getBoundingClientRect();

    this.startPos = [e.x - rect.left, e.y - rect.top];

    canvasEl.onmousemove = (e) => {
      this.currPos = [e.x - rect.left, e.y - rect.top]
      this.drawer.beginCircle(this.ctx, this.startPos, this.currPos)
    };
    canvasEl.onmouseover = (e) => {

      this.currPos = [e.x,e.y]
      console.log(e);
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
