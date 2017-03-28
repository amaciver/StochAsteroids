// const Asteroid = require('./asteroid.js');
const Util = require('./utils.js');

// import Asteroid2 from './asteroid2.js';

let startPos;
let currPos;

function Drawer(game, ctx) {
  this.game = game;
  this.ctx = ctx;
}

Drawer.prototype.beginCircle = function(ctx, startPos, currPos) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    startPos[0],
    startPos[1],
    Util.distance(startPos, currPos),
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
}
const canvasEl = document.querySelector('canvas');


// canvasEl.onmousemove = (e) => {
//   currPos = [e.x, e.y]
// }
//
// canvasEl.onmousedown = (e) => {
//   const drawer = new Drawer()
//
// }
//
// canvasEl.onmouseup = (e) => {
//   console.log(e.x, e.y);
// }

module.exports = Drawer;
