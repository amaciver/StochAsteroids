const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');
// const Ship = require('./ship.js');

function Asteroid (pos, game, radius) {
  const COLOR = 'red';
  let POSITION = pos;
  let RADIUS;
  if (radius) {
    RADIUS = radius;
  } else {
    RADIUS = 25 * Math.random() + 15;
  }

  if (POSITION[0] - RADIUS < 0) {
    POSITION[0] = RADIUS;
  }
  if (POSITION[0] + RADIUS > game.DIM_X) {
    POSITION[0] = game.DIM_X - RADIUS;
  }
  if (POSITION[1] - RADIUS < 0) {
    POSITION[1] = RADIUS;
  }
  if (POSITION[1] + RADIUS > game.DIM_Y) {
    POSITION[1] = game.DIM_Y - RADIUS;
  }
  const VECT = this.randomVec(5);
  MovingObject.call(this, {color: COLOR, radius: RADIUS, pos: POSITION, vel: VECT, game: game});
  this.mass = (4/3) * Math.PI * Math.pow(this.radius, 3);
  this.hasCollided = false;

}

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.randomVec = function (length) {
  const deg = 2 * Math.PI * Math.random();
  return Util.scale([Math.sin(deg), Math.cos(deg)], length);
};

Asteroid.prototype.collideWith = function(otherObject) {
  Util.resolveCollison(this, otherObject);
};

Asteroid.prototype.move = function() {
  // console.log(this.vel);
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  // this.pos = this.game.wrap(this.pos, this.vel, this.radius);
  // if (this.vel[0] > 0) {
  //   // console.log("reduce");
  //   this.vel[0] *= .9;
  // }
  // if (this.vel[0] < 0) {this.vel[0] += 10}
  // if (this.vel[1] > 0) {this.vel[1] -= 10}
  // if (this.vel[1] < 0) {this.vel[1] += 10}
  // this.vel[0] *= .999;
  // this.vel[1] *= .999;
};

module.exports = Asteroid;
