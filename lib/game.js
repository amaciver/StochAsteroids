// const Ship = require('./ship.js');
const Asteroid = require('./asteroid.js');
// const Bullet = require('./bullet.js');

function Game(audio) {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  // console.log(canvasEl);
  this.DIM_X = canvasEl.width;
  this.DIM_Y = canvasEl.height;
  this.NUM_ASTEROIDS = 4;
  this.asteroids = [];
  this.addAsteroids();
  this.audio = audio;
}

// Game.prototype.everyObj = function() {
//   let result = [];
//   result = result.concat(this.asteroids);
//   return result;
// };

Game.prototype.addAsteroids = function () {
  for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid(this.randomPosition(), this));
  }
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);
  this.asteroids.forEach(el => {
    el.draw(ctx);
  });
};

Game.prototype.wrap = function(pos, vel, rad) {
  // console.log(vel);
  const result = pos;
  if (pos[0] - rad > this.DIM_X && vel[0] > 0) {
    result[0] = 0-rad;
  }
  if (pos[0] + rad < 0 && vel[0] < 0) {
    result[0] = this.DIM_X + rad;
  }
  if (pos[1] - rad > this.DIM_Y && vel[1] > 0) {
    result[1] = 0 - rad;
  }
  if (pos[1] + rad < 0 && vel[1] < 0) {
    result[1] = this.DIM_Y + rad;
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
  this.checkWalls();
  this.asteroids.forEach((obj) => obj.move());
  this.checkCollisons();
};

Game.prototype.checkCollisons = function() {
  for (var i = 0; i < this.asteroids.length; i++) {
    for (var j = i + 1; j < this.asteroids.length; j++) {
      if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
        this.audio.playSound(0);
        this.asteroids[i].collideWith(this.asteroids[j]);
      }
    }
  }
};

Game.prototype.checkWalls = function() {
  for (var i = 0; i < this.asteroids.length; i++) {
    const asteroid = this.asteroids[i];
    // console.log("test");
    if (asteroid.pos[0] - asteroid.radius <= 0) {
      asteroid.vel[0] = -(asteroid.vel[0]);
      asteroid.pos[0] += 1

    }
    if (asteroid.pos[0] + asteroid.radius >= this.DIM_X) {
      asteroid.vel[0] = -(asteroid.vel[0]);
      asteroid.pos[0] -= 1
    }
    if (asteroid.pos[1] - asteroid.radius <= 0) {
      asteroid.vel[1] = -(asteroid.vel[1]);
      asteroid.pos[1] += 1

    }
    if (asteroid.pos[1] + asteroid.radius >= this.DIM_Y) {
      asteroid.vel[1] = -(asteroid.vel[1]);
      asteroid.pos[1] -= 1

    }
  }
}

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
