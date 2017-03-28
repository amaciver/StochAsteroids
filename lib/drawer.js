import Util from './utils.js';

class Drawer {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  beginCircle(ctx, startPos, currPos) {
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
}

export default Drawer;
