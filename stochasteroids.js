// const Game = require('./lib/game.js');
// const GameView = require('./lib/game_view.js');
// const Util = require('./lib/utils.js');
// const MovingObject = require('./lib/moving_object.js');
// const Asteroid = require('./lib/asteroid.js');

// const AudioTest = require('./lib/audio_test.js');
// const Drawer = require('./lib/drawer.js');

import Audio from './lib/audio.js';
import GameView from './lib/game_view.js';

// window.Game = Game;
// window.Asteroid = Asteroid;
// window.MovingObject = MovingObject;
window.GameView = GameView;
// window.Util = Util;



document.addEventListener("DOMContentLoaded", function(event) {
  const sources = [
    "sounds/dink.wav",
    "sounds/epiano/epiano_c3.wav",
    "sounds/epiano/epiano_d3.wav",
    "sounds/epiano/epiano_e3.wav",
    "sounds/epiano/epiano_f3.wav",
    "sounds/epiano/epiano_g3.wav",
    "sounds/epiano/epiano_a3.wav",
    "sounds/epiano/epiano_b3.wav",
    "sounds/epiano/epiano_c4.wav",
    "sounds/epiano/epiano_d4.wav",
    "sounds/epiano/epiano_e4.wav",
    "sounds/epiano/epiano_f4.wav",
    "sounds/epiano/epiano_g4.wav",
    "sounds/epiano/epiano_a4.wav",
    "sounds/epiano/epiano_b4.wav"
  ]
  const canvasEl = document.getElementsByTagName("canvas")[0];
  const ctx = canvasEl.getContext("2d");
  let audio = new Audio(sources);
  audio.init();
  audio.loadSounds();
  // setTimeout(() => audio.playSound(0), 2000);
  const gv = new GameView(ctx, audio);
  gv.init();
  // gv.start();
});
