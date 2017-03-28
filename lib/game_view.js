import Game from './game.js'
import Drawer from './drawer.js';
import Util from './utils.js';
import Asteroid from './asteroid.js';

function GameView(ctx, audio) {
  this.game = new Game(audio);
  this.drawer = new Drawer(this.game, ctx)
  this.ctx = ctx;
  this.currPos = [];
  this.lastPos = [];
  this.startPos = [];
  this.audio = audio;
}

GameView.prototype.init = function () {
  const canvasEl = document.querySelector('canvas');
  const playButton = document.querySelector('.play');

  playButton.addEventListener('click', () => this.start)

  canvasEl.onmouseup = (e) => {
    const canvasEl = document.getElementById('canvas');
    const rect = canvasEl.getBoundingClientRect();
    this.currPos = [e.x - rect.left, e.y-rect.top];
    const radius = Util.distance(this.startPos, this.currPos);
    canvasEl.onmousemove = () => {};
    canvasEl.onmouseover = () => {};
    this.game.asteroids.push(new Asteroid({pos: this.startPos, game: this.game, radius: radius}))
  }

  canvasEl.onmousedown = (e) => {
    const canvasEl = document.getElementById('canvas');
    const rect = canvasEl.getBoundingClientRect();
    console.log("down");

    this.startPos = [e.x - rect.left, e.y - rect.top];

    canvasEl.onmousemove = (e) => {
      this.ctx.clearRect(0,0,canvasEl.width, canvasEl.height);
      this.currPos = [e.x - rect.left, e.y - rect.top]

      this.lastPos = this.currPos
      this.drawer.beginCircle(this.ctx, this.startPos, this.currPos);

    };
    // canvasEl.onmouseover = (e) => {
    //
    //   this.currPos = [e.x,e.y]
    //   console.log(e);
    //   this.drawer.beginCircle(this.ctx, this.startPos, this.currPos)
    // };
    // this.drawer.beginCircle(this.ctx, [e.x,e.y], this.mousePos)
  }
}

GameView.prototype.start = function () {
  const mute = document.querySelector('.mute')
  let that = this;
  mute.addEventListener('click', () => {
    if (mute.id == "mute") {
      this.audio.masterGain.gain.value = 0;
      mute.id = "unmute";
      mute.innerHTML = "Unmute";
    } else {
      this.audio.masterGain.gain.value = 1;
      mute.id = "mute";
      mute.innerHTML = "Mute";
    }
  })




  setInterval(() => {
    this.game.moveObjects();
    this.game.draw(this.ctx);
  }, 20);
};



module.exports = GameView;
