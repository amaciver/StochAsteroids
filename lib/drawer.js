import Util from './utils.js';

class Drawer {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  beginCircle(ctx, startPos, currPos, color) {
    ctx.fillStyle = color;
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

    const x1 = startPos[0];
    const y1 = startPos[1];
    const x2 = currPos[0];
    const y2 = currPos[1];
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth=2;
    ctx.strokeStyle = "black";
    ctx.stroke();
  }
}

export default Drawer;
