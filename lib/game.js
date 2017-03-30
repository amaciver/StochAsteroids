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
  constructor(audio, seed, ctx) {
    this.canvasEl = document.getElementsByTagName("canvas")[0];
    this.DIM_X = this.canvasEl.width;
    this.DIM_Y = this.canvasEl.height;
    this.ctx = ctx;
    this.NUM_ASTEROIDS = seed;
    this.asteroids = [];
    this.addAsteroids();
    this.audio = audio;
    this.matrix = Markov.generateMatrix(15,15);
    // this.canvasWrapper = document.querySelector('.canvas-wrapper');
    // console.log(Markov.resolveEvolution(2, this.matrix));
  }

  addAsteroids() {
    for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroid({pos: this.randomPosition(), game: this, color:'red'}));
    }
  }

  draw(ctx) {
    // this.canvasEl.width = this.canvasWrapper.width;
    // this.canvasEl.height = this.canvasWrapper.height;
    // this.DIM_X = this.canvasEl.width;
    // this.DIM_Y = this.canvasEl.height;
    ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);
    this.asteroids.forEach(el => {
      el.draw(ctx);
    });
  }

  drawBounce(ctx, pos) {
    ctx.fillStyle = 'black';
    ctx.beginPath();

    ctx.arc(
      pos[0],
      pos[1],
      30,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
    // debugger;
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
          const a1 = this.asteroids[i]
          const a2 = this.asteroids[j]
          const cpx = ((a1.pos[0]*a2.radius) + (a2.pos[0]*a1.radius)) / (a1.radius + a2.radius);
          const cpy = ((a1.pos[1]*a2.radius) + (a2.pos[1]*a1.radius)) / (a1.radius + a2.radius);

          this.drawBounce(this.ctx, [cpx, cpy])
          // let int = getRandomInt(0,15);
          let combo = this.asteroids[i].color + this.asteroids[j].color;
          let index = colorCombos[combo];

          const soundIndex = Markov.resolveEvolution(index, this.matrix)
          console.log(soundIndex);
          this.audio.playSound(soundIndex);
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
