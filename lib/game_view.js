import Game from './game.js'
import Drawer from './drawer.js';
import Util from './utils.js';
import Asteroid from './asteroid.js';

const sources1 = [
  "sounds/epiano/epiano_c3.mp3",
  "sounds/epiano/epiano_d3.mp3",
  "sounds/epiano/epiano_e3.mp3",
  "sounds/epiano/epiano_f3.mp3",
  "sounds/epiano/epiano_g3.mp3",
  "sounds/epiano/epiano_a3.mp3",
  "sounds/epiano/epiano_b3.mp3",
  "sounds/epiano/epiano_c4.mp3",
  "sounds/epiano/epiano_d4.mp3",
  "sounds/epiano/epiano_e4.mp3",
  "sounds/epiano/epiano_f4.mp3",
  "sounds/epiano/epiano_g4.mp3",
  "sounds/epiano/epiano_a4.mp3",
  "sounds/epiano/epiano_b4.mp3",
  "sounds/epiano/epiano_c5.mp3"
]
const sources2 = [
  "sounds/piano/piano_c2.mp3",
  "sounds/piano/piano_d2.mp3",
  "sounds/piano/piano_ef2.mp3",
  "sounds/piano/piano_f2.mp3",
  "sounds/piano/piano_g2.mp3",
  "sounds/piano/piano_af2.mp3",
  "sounds/piano/piano_bf2.mp3",
  "sounds/piano/piano_c3.mp3",
  "sounds/piano/piano_d3.mp3",
  "sounds/piano/piano_ef3.mp3",
  "sounds/piano/piano_f3.mp3",
  "sounds/piano/piano_g3.mp3",
  "sounds/piano/piano_af3.mp3",
  "sounds/piano/piano_bf3.mp3",
  "sounds/piano/piano_c4.mp3"
]

class GameView {
  constructor(ctx, audio) {
    this.game = new Game(audio, 4, ctx);
    this.drawer = new Drawer(this.game, ctx)
    this.canvasWrapper = document.getElementById('canvas-wrapper');
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
    this.audio.init();
    audio.loadSounds(sources1);
  }

  init() {
    const canvasEl = document.querySelector('canvas');
    const playButton = document.querySelector('.play');
    const stopButton = document.querySelector('.stop');
    const resetButton = document.querySelector('.step-backwards');
    const mute = document.querySelector('.mute')
    const random = document.querySelector('.random');
    const sounds = document.querySelector('.sounds');

    //Color boxes
    const redBox = document.querySelector('.color-box-red');
    const blueBox = document.querySelector('.color-box-blue');
    const greenBox = document.querySelector('.color-box-green');
    const yellowBox = document.querySelector('.color-box-yellow');
    const purpleBox = document.querySelector('.color-box-purple');
    redBox.className += " selected";


    // Modal handling
    const moreInfo = document.querySelector('.more-info');

    const moreInfoModal = document.getElementById('more-info-modal');
    const introModal = document.getElementById('intro-modal');
    const markovModal = document.getElementById('markov-modal');

    const moreInfoLink = document.querySelector('.more-info-link');
    const markovLink = document.querySelector('.markov-link');

    const moreInfoClose = document.getElementById("close-info");
    const introClose = document.getElementById("close-intro");
    const markovClose = document.getElementById("close-markov");

    moreInfo.onclick = () => { moreInfoModal.style.display = "block"; }

    moreInfoClose.onclick = () => { moreInfoModal.style.display = "none"; }
    introClose.onclick = () => { introModal.style.display = "none"; }
    markovClose.onclick = () => {
      markovModal.style.display = "none";
      moreInfoModal.style.display = "block";
    }

    window.onclick = (event) => {
      if (event.target == moreInfoModal) { moreInfoModal.style.display = "none"; }
      if (event.target == introModal) { introModal.style.display = "none"; }
      if (event.target == markovModal) {
        markovModal.style.display = "none";
        moreInfoModal.style.display = "block";
      }
    }

    moreInfoLink.onclick = () => {
      introModal.style.display = "none";
      moreInfoModal.style.display = "block";
    }

    markovLink.onclick = () => {
      moreInfoModal.style.display = "none";
      markovModal.style.display = "block";
    }

    introModal.style.display = "block";

    //Window resizing
    window.onresize = () => {
      this.game.updateBounds();
      this.canvasWrapper.width = window.innerWidth-200;
      this.canvasWrapper.height = window.innerHeight*.75
      this.canvasEl.width = window.innerWidth-200;
      this.canvasEl.height = window.innerHeight*.75;
      this.game.draw(this.ctx);
    }

    //Controls
    playButton.addEventListener('click', () => {
      if (this.playing === false) {
        this.playing = true;
        this.start();
      }
    });
    stopButton.addEventListener('click', () => {
      if (this.playing === true) {
        // console.log('stop');
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
    random.addEventListener('click', () => {
      console.log("random");
      this.ctx.clearRect(0,0,this.canvasEl.width, this.canvasEl.height);
      this.game = new Game(this.audio, Util.getRandomInt(2,7), this.ctx);
      this.game.draw(this.ctx);
    })
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

    //Color Selectors
    redBox.addEventListener('click', () => {
      if (!redBox.classList.contains('selected')) {
        const currSelected = document.querySelector('.color-box-'+`${this.selectedColor}`)
        currSelected.classList.remove("selected")
        redBox.className += " selected"
        this.selectedColor = 'red';
      }
    })
    blueBox.addEventListener('click', () => {
      if (!blueBox.classList.contains('selected')) {
        const currSelected = document.querySelector('.color-box-'+`${this.selectedColor}`)
        currSelected.classList.remove("selected");
        blueBox.className += " selected";
        this.selectedColor = 'blue';
      }
    })
    greenBox.addEventListener('click', () => {
      if (!greenBox.classList.contains('selected')) {
        const currSelected = document.querySelector('.color-box-'+`${this.selectedColor}`)
        currSelected.classList.remove("selected")
        greenBox.className += " selected"
        this.selectedColor = 'green';
      }
    })
    yellowBox.addEventListener('click', () => {
      if (!yellowBox.classList.contains('selected')) {
        const currSelected = document.querySelector('.color-box-'+`${this.selectedColor}`)
        currSelected.classList.remove("selected")
        yellowBox.className += " selected"
        this.selectedColor = 'yellow';
      }
    })
    purpleBox.addEventListener('click', () => {
      if (!purpleBox.classList.contains('selected')) {
        const currSelected = document.querySelector('.color-box-'+`${this.selectedColor}`)
        currSelected.classList.remove("selected")
        purpleBox.className += " selected"
        this.selectedColor = 'purple';
      }
    })

    //Sounds Selector
    sounds.addEventListener('change', (e) => {
      this.audio.buffers = [];
      if (e.target.value === "sources1") {
        this.audio.loadSounds(sources1);
      }
      if (e.target.value === "sources2") {
        this.audio.loadSounds(sources2);
      }
    })

    //Draw game
    this.game.draw(this.ctx);


    //Draw Handlers
    canvasEl.onmouseup = (e) => {
      const canvasEl = document.getElementById('canvas');
      const rect = canvasEl.getBoundingClientRect();
      this.currPos = [e.x - rect.left, e.y - rect.top];
      const radius = Util.distance(this.startPos, this.currPos);
      canvasEl.onmousemove = () => {};
      const vel = Util.scale([((this.currPos[0]-this.startPos[0])*.01), ((this.currPos[1]-this.startPos[1])*.01)], Util.getRandomInt(1,15));
      this.game.asteroids.push(new Asteroid({pos: this.startPos, game: this.game, radius: radius, vel: vel, color: this.selectedColor}))
      if (this.playing === true) {
        this.start();
      }
    }
    canvasEl.onmousedown = (e) => {
      if (this.playing === true) {
        this.stop();
      }
      const canvasEl = document.getElementById('canvas');
      const rect = canvasEl.getBoundingClientRect();
      this.startPos = [e.x - rect.left, e.y - rect.top];
      canvasEl.onmousemove = (e) => {
        this.ctx.clearRect(0,0,canvasEl.width, canvasEl.height);
        this.currPos = [e.x - rect.left, e.y - rect.top]
        this.game.draw(this.ctx);
        this.lastPos = this.currPos;
        this.drawer.beginCircle(this.ctx, this.startPos, this.currPos, this.selectedColor);
      }
    }
  }

  start() {
    this.game.moveObjects();
    // this.ctx.clearRect(0,0,canvasEl.width, canvasEl.height);

    this.req = window.requestAnimationFrame(() => {
      this.ctx.clearRect(0,0,this.canvasEl.width, this.canvasEl.height);
      this.game.draw(this.ctx);
      this.start();
    })
  }

  stop() {
    window.cancelAnimationFrame(this.req);
  }
}

export default GameView;
