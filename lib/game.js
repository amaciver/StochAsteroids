// const Ship = require('./ship.js');
const Asteroid = require('./asteroid.js');
// const Bullet = require('./bullet.js');

function Game() {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  console.log(canvasEl);
  this.DIM_X = canvasEl.width;
  this.DIM_Y = canvasEl.height;
  this.NUM_ASTEROIDS = 4;
  this.asteroids = [];
  this.addAsteroids();
}

Game.prototype.everyObj = function() {
  let result = [];
  result = result.concat(this.asteroids);
  return result;
};

Game.prototype.addAsteroids = function () {
  for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid(this.randomPosition(), this));
  }
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);
  this.everyObj().forEach(el => {
    el.draw(ctx);
  });
};

Game.prototype.wrap = function(pos) {
  const result = pos;
  if (pos[0] > this.DIM_X) {
    result[0] = 0;
  }
  if (pos[0] < 0) {
    result[0] = this.DIM_X;
  }
  if (pos[1] > this.DIM_Y) {
    result[1] = 0;
  }
  if (pos[1] < 0) {
    result[1] = this.DIM_Y;
  }
  return result;
};

Game.prototype.randomPosition = function () {
  const xpos = getRandomInt(0, this.DIM_X);
  const ypos = getRandomInt(0, this.DIM_Y);
  // console.log(xpos, ypos);
  return [xpos, ypos];
};

Game.prototype.moveObjects = function() {
  this.everyObj().forEach((obj) => obj.move());
  this.checkCollisons();
};

Game.prototype.checkCollisons = function() {
  for (var i = 0; i < this.everyObj().length - 1; i++) {
    for (var j = i + 1; j < this.everyObj().length; j++) {
      if (this.everyObj()[i].isCollidedWith(this.everyObj()[j])) {
        this.everyObj()[i].collideWith(this.everyObj()[j]);
      }
    }
  }
};

Game.prototype.remove = function(obj) {
  if (obj instanceof Asteroid) {
    const idx = this.asteroids.indexOf(obj);
    this.asteroids.splice(idx, 1);
  }
};


module.exports = Game;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
