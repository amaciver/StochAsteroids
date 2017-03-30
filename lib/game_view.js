import Game from './game.js'
import Drawer from './drawer.js';
import Util from './utils.js';
import Asteroid from './asteroid.js';


class GameView {
  constructor(ctx, audio) {
    this.game = new Game(audio, 4, ctx);
    this.drawer = new Drawer(this.game, ctx)
    this.canvasEl = document.getElementById('canvas');

    this.ctx = ctx;
    this.currPos = [];
    this.lastPos = [];
    this.startPos = [];
    this.audio = audio;
    this.req;
    this.start = this.start.bind(this);
    this.playing = false;
    this.selectedColor = 'red';
  }

  init() {
    const canvasEl = document.querySelector('canvas');
    const playButton = document.querySelector('.play');
    const stopButton = document.querySelector('.stop');
    const resetButton = document.querySelector('.step-backwards');
    const redBox = document.querySelector('.color-box-red');
    const blueBox = document.querySelector('.color-box-blue');
    const greenBox = document.querySelector('.color-box-green');
    const yellowBox = document.querySelector('.color-box-yellow');
    const purpleBox = document.querySelector('.color-box-purple');
        // Get the modal
    const modal = document.getElementById('myModal');
    const modalText = document.querySelector('.modal-text');
    modalText.innerHTML = `${this.game.matrix}`;
    // Get the button that opens the modal
    const btn = document.getElementById("myBtn");
    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];
    // When the user clicks on the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
    }
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    playButton.addEventListener('click', () => {
      if (this.playing === false) {
        this.playing = true;
        this.start();
      }
    });

    stopButton.addEventListener('click', () => {
      if (this.playing === true) {
        this.playing = false;
        this.stop();
      }
    });

    resetButton.addEventListener('click', () => {
      if (this.playing === true) {
        this.playing = false;
        this.stop();
        this.game.asteroids = [];
        this.ctx.clearRect(0,0,this.canvasEl.width, this.canvasEl.height);
      } else {
        this.stop();
        this.game.asteroids = [];
        this.ctx.clearRect(0,0,this.canvasEl.width, this.canvasEl.height);
      }
    })

    redBox.addEventListener('click', () => {
      this.selectedColor = 'red';
    })
    blueBox.addEventListener('click', () => {
      this.selectedColor = 'blue';
    })
    greenBox.addEventListener('click', () => {
      this.selectedColor = 'green';
    })
    yellowBox.addEventListener('click', () => {
      this.selectedColor = 'yellow';
    })
    purpleBox.addEventListener('click', () => {
      this.selectedColor = 'purple';
    })

    this.game.draw(this.ctx);

    canvasEl.onmouseup = (e) => {
      const canvasEl = document.getElementById('canvas');
      const rect = canvasEl.getBoundingClientRect();
      this.currPos = [e.x - rect.left, e.y - rect.top];
      const radius = Util.distance(this.startPos, this.currPos);
      canvasEl.onmousemove = () => {};
      const vel = Util.scale([((this.currPos[0]-this.startPos[0])*.01), ((this.currPos[1]-this.startPos[1])*.01)], Util.getRandomInt(1,15));
      this.game.asteroids.push(new Asteroid({pos: this.startPos, game: this.game, radius: radius, vel: vel, color: this.selectedColor}))
    }

    canvasEl.onmousedown = (e) => {
      const canvasEl = document.getElementById('canvas');
      const rect = canvasEl.getBoundingClientRect();
      console.log("down");

      this.startPos = [e.x - rect.left, e.y - rect.top];

      canvasEl.onmousemove = (e) => {
        this.ctx.clearRect(0,0,canvasEl.width, canvasEl.height);
        this.currPos = [e.x - rect.left, e.y - rect.top]
        this.game.draw(this.ctx);
        this.lastPos = this.currPos
        this.drawer.beginCircle(this.ctx, this.startPos, this.currPos, this.selectedColor);
      };
    }

    const mute = document.querySelector('.mute')
    // let that = this;
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
    });
  }

  start() {
    this.game.moveObjects();
    this.game.draw(this.ctx);

    // this.canvasEl.onmouseup = (e) => {
    //   const canvasEl = document.getElementById('canvas');
    //   const rect = canvasEl.getBoundingClientRect();
    //   this.currPos = [e.x - rect.left, e.y - rect.top];
    //   const radius = Util.distance(this.startPos, this.currPos);
    //   canvasEl.onmousemove = () => {};
    //   this.game.asteroids.push(new Asteroid({pos: this.startPos, game: this.game, radius: radius}))
    // }
    //
    // this.canvasEl.onmousedown = (e) => {
    //   const canvasEl = document.getElementById('canvas');
    //   const rect = canvasEl.getBoundingClientRect();
    //   console.log("down");
    //
    //   this.startPos = [e.x - rect.left, e.y - rect.top];
    //
    //   canvasEl.onmousemove = (e) => {
    //     this.ctx.clearRect(0,0,canvasEl.width, canvasEl.height);
    //     this.currPos = [e.x - rect.left, e.y - rect.top]
    //     this.game.draw(this.ctx);
    //     this.lastPos = this.currPos
    //     this.drawer.beginCircle(this.ctx, this.startPos, this.currPos);
    //   };
    // }

    this.req = window.requestAnimationFrame(this.start)
  }

  stop() {
    window.cancelAnimationFrame(this.req);
  }
}

export default GameView;
