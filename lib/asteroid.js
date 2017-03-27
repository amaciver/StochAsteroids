const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');
// const Ship = require('./ship.js');

function Asteroid (pos, game) {
  const COLOR = 'red';
  const RADIUS = 25 * Math.random() + 15;
  const VECT = this.randomVec(5);
  MovingObject.call(this, {color: COLOR, radius: RADIUS, pos: pos, vel: VECT, game: game});
  this.mass = (4/3) * Math.PI * Math.pow(this.radius, 3);


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
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.pos = this.game.wrap(this.pos);
};

module.exports = Asteroid;
