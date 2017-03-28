const Util = require('./utils.js');



function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
  this.theta = Util.theta(this.vel);
}


MovingObject.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

MovingObject.prototype.move = function() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  // if (this.vel[0] > 0) {
  //   console.log("reduce");
  //   this.vel[0] -= 10;
  // }
  // if (this.vel[0] < 0) {this.vel[0] += 10}
  // if (this.vel[1] > 0) {this.vel[1] -= 10}
  // if (this.vel[1] < 0) {this.vel[1] += 10}
  // console.log(this.vel);
  // this.pos = this.game.wrap(this.pos, this.vel);
};

MovingObject.prototype.isCollidedWith = function(otherObject) {
  // if (Util.distance(this.pos, otherObject.pos) <= this.radius || Util.distance(this.pos, otherObject.pos) <= otherObject.radius) {
  //   console.log("test");
  //   this.pos[0] = Util.getRandomInt(this.radius, this.game.DIM_X - this.radius);
  //   this.pos[1] = Util.getRandomInt(this.radius, this.game.DIM_Y - this.radius);
  //   console.log(this.pos);
  //   return true;
  // } else if (Util.distance(this.pos, otherObject.pos) <= (this.radius + otherObject.radius)) {
  //   return true;
  // }
  if (Util.distance(this.pos, otherObject.pos) <= (this.radius + otherObject.radius)) {
    return true;
  }
  else { return false; }
};

MovingObject.prototype.collideWith = function(otherObject) {
};

module.exports = MovingObject;
