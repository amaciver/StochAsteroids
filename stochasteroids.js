const Game = require('./lib/game.js');
const GameView = require('./lib/game_view.js');
const Util = require('./lib/utils.js');
const MovingObject = require('./lib/moving_object.js');
const Asteroid = require('./lib/asteroid.js');

const AudioTest = require('./lib/audio_test.js');
const Drawer = require('./lib/drawer.js');

window.Game = Game;
window.Asteroid = Asteroid;
window.MovingObject = MovingObject;
window.GameView = GameView;
window.Util = Util;

document.addEventListener("DOMContentLoaded", function(event) {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  const ctx = canvasEl.getContext("2d");
  const gv = new GameView(ctx);
  gv.start();
});
