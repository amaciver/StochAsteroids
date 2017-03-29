// import Asteroid from './asteroid.js';
import Asteroid from './asteroid.js';
import Markov from './markov.js';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const colorCombos = {
  'redblue': 0,
  'redgreen': 1,
  'redyellow': 2,
  'redpurple': 3,
  'bluered': 0,
  'greenred': 1,
  'yellowred': 2,
  'purplered': 3,
  'redred': 4,

  'bluegreen': 5,
  'blueyellow': 6,
  'bluepurple': 7,
  'greenblue': 5,
  'yellowblue': 6,
  'purpleblue': 7,
  'blueblue': 8,

  'greenyellow': 9,
  'greenpurple': 10,
  'yellowgreen': 9,
  'purplegreen': 10,
  'greengreen': 11,

  'yellowpurple': 12,
  'purpleyellow': 12,
  'yellowyellow': 13,

  'purplepurple': 14
}

class Game {
  constructor(audio, seed) {
    const canvasEl = document.getElementsByTagName("canvas")[0];
    this.DIM_X = canvasEl.width;
    this.DIM_Y = canvasEl.height;
    this.NUM_ASTEROIDS = seed;
    this.asteroids = [];
    this.addAsteroids();
    this.audio = audio;
    this.matrix = Markov.generateMatrix(15,15);
    // console.log(Markov.resolveEvolution(2, this.matrix));
  }

  addAsteroids() {
    for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroid({pos: this.randomPosition(), game: this, color:'red'}));
    }
  }

  draw(ctx) {
    ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);
    this.asteroids.forEach(el => {
      el.draw(ctx);
    });
  }

  moveObjects() {
    this.checkWalls();
    this.asteroids.forEach((obj) => obj.move());
    this.checkCollisons();
  }

  wrap(pos, vel, rad) {
    const newPos = pos;
    if (pos[0] - rad > this.DIM_X && vel[0] > 0) {
      newPos[0] = 0-rad;
    }
    if (pos[0] + rad < 0 && vel[0] < 0) {
      newPos[0] = this.DIM_X + rad;
    }
    if (pos[1] - rad > this.DIM_Y && vel[1] > 0) {
      newPos[1] = 0 - rad;
    }
    if (pos[1] + rad < 0 && vel[1] < 0) {
      newPos[1] = this.DIM_Y + rad;
    }
    return newPos;
  }

  checkCollisons() {
    for (var i = 0; i < this.asteroids.length; i++) {
      for (var j = i + 1; j < this.asteroids.length; j++) {
        if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
          // let int = getRandomInt(0,15);
          let combo = this.asteroids[i].color + this.asteroids[j].color;
          let index = colorCombos[combo];
          this.audio.playSound(index);
          this.asteroids[i].collideWith(this.asteroids[j]);
        }
      }
    }
  }

  checkWalls() {
    for (var i = 0; i < this.asteroids.length; i++) {
      const asteroid = this.asteroids[i];
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

  remove(obj) {
    if (obj instanceof Asteroid) {
      const idx = this.asteroids.indexOf(obj);
      this.asteroids.splice(idx, 1);
    }
  }

  randomPosition() {
    const xpos = getRandomInt(0, this.DIM_X);
    const ypos = getRandomInt(0, this.DIM_Y);
    return [xpos, ypos];
  }
}

export default Game;
