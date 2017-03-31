/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var COLORS = ['red', 'blue', 'yellow', 'green', 'purple'];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var Util = {
  inherits: function inherits(childClass, parentClass) {
    childClass.prototype = Object.create(parentClass.prototype);
    childClass.prototype.constructor = childClass;
  },


  // Scale the length of a vector by the given amount.
  scale: function scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },
  getRandomInt: function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  },
  randomVec: function randomVec(length) {
    var deg = 2 * Math.PI * Math.random();
    return this.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  distance: function distance(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
  },
  theta: function theta(vel) {
    var vmag = Math.sqrt(vel[0] * vel[0] + vel[1] * vel[1]);
    var theta = Math.acos(vel[0] / vmag);
    if (vmag === 0) {
      theta = 0;
    }
    if (vel[1] < 0) {
      theta = -theta;
    }
    if (theta < 0) {
      theta = 2 * Math.PI + theta;
    }
    // console.log(theta);
    return theta;
  },
  magnitude: function magnitude(vel) {
    return Math.sqrt(vel[0] * vel[0] + vel[1] * vel[1]);
  },
  phi: function (_phi) {
    function phi(_x, _x2, _x3, _x4) {
      return _phi.apply(this, arguments);
    }

    phi.toString = function () {
      return _phi.toString();
    };

    return phi;
  }(function (y1, y2, x1, x2) {
    var phi1 = Math.atan((cpy - y1) / (cpx - x1));
    if (phi1 < 0) {
      phi1 = 2 * Math.PI + phi1;
    }
    return phi;
  }),
  vect: function vect(x1, x2, y1, y2) {
    return [x2 - x1, y2 - y1];
  },
  resolveCollison: function resolveCollison(obj1, obj2, matrix) {

    var x1 = obj1.pos[0];
    var y1 = obj1.pos[1];
    var x2 = obj2.pos[0];
    var y2 = obj2.pos[1];

    var r1 = obj1.radius;
    var r2 = obj2.radius;

    var m1 = obj1.mass;
    var m2 = obj2.mass;

    var u1 = obj1.vel;
    var u2 = obj2.vel;

    var u1mag = Math.sqrt(u1[0] * u1[0] + u1[1] * u1[1]);
    var u2mag = Math.sqrt(u2[0] * u2[0] + u2[1] * u2[1]);

    //contact point
    var cpx = (x1 * r2 + x2 * r1) / (r1 + r2);
    var cpy = (y1 * r2 + y2 * r1) / (r1 + r2);

    //angle of collision
    var phi1 = Math.atan((cpy - y1) / (cpx - x1));
    if (phi1 < 0) {
      phi1 = 2 * Math.PI + phi1;
    }

    //direction of travel 1
    var theta1 = Math.acos(u1[0] / u1mag);
    if (u1[1] < 0) {
      theta1 = -theta1;
    }
    if (theta1 < 0) {
      theta1 = 2 * Math.PI + theta1;
    }

    //direction of travel 2
    var theta2 = Math.acos(u2[0] / u2mag);
    if (u2[1] < 0) {
      theta2 = -theta2;
    }
    if (theta2 < 0) {
      theta2 = 2 * Math.PI + theta2;
    }

    //new velocities
    var v1x = (u1mag * Math.cos(theta1 - phi1) * (m1 - m2) + 2 * m2 * u2mag * Math.cos(theta2 - phi1)) / (m1 + m2) * Math.cos(phi1) + u1mag * Math.sin(theta1 - phi1) * Math.cos(phi1 + Math.PI / 2);
    var v1y = (u1mag * Math.cos(theta1 - phi1) * (m1 - m2) + 2 * m2 * u2mag * Math.cos(theta2 - phi1)) / (m1 + m2) * Math.sin(phi1) + u1mag * Math.sin(theta1 - phi1) * Math.sin(phi1 + Math.PI / 2);
    var v2x = (u2mag * Math.cos(theta2 - phi1) * (m2 - m1) + 2 * m1 * u1mag * Math.cos(theta1 - phi1)) / (m1 + m2) * Math.cos(phi1) + u2mag * Math.sin(theta2 - phi1) * Math.cos(phi1 + Math.PI / 2);
    var v2y = (u2mag * Math.cos(theta2 - phi1) * (m2 - m1) + 2 * m1 * u1mag * Math.cos(theta1 - phi1)) / (m1 + m2) * Math.sin(phi1) + u2mag * Math.sin(theta2 - phi1) * Math.sin(phi1 + Math.PI / 2);

    // Version without contact angles

    // const v1x = ( (u1[0]*(m1-m2) + 2*m2*u2[0]) / (m1 + m2));
    // const v1y = ( (u1[1]*(m1-m2) + 2*m2*u2[1]) / (m1 + m2));
    // const v2x = ( (u2[0]*(m2-m1) + 2*m1*u1[0]) / (m1 + m2));
    // const v2y = ( (u2[1]*(m2-m1) + 2*m1*u1[1]) / (m1 + m2));
    var rand1 = getRandomInt(0, 5);
    var rand2 = getRandomInt(0, 5);
    obj1.color = COLORS[rand1];
    obj2.color = COLORS[rand2];

    // v1x *= .99;
    // v1y *= .99;
    // v2x *= .99;
    // v2y *= .99;

    //adjust position of faster object to ideal contact point to avoid capturing
    if (this.distance([x1 + v1x, y1 + v1y], [x2 + v2x, y2 + v1y]) < obj1.radius + obj2.radius) {
      if (u1mag > u2mag) {
        if (x1 < x2) {
          obj1.pos[0] = x2 - Math.abs((r1 + r2) * Math.cos(phi1));
          if (y1 < y2) {
            obj1.pos[1] = y2 - Math.abs((r1 + r2) * Math.sin(phi1));
          } else {
            obj1.pos[1] = y2 + Math.abs((r1 + r2) * Math.sin(phi1));
          }
        } else {
          obj1.pos[0] = x2 + Math.abs((r1 + r2) * Math.cos(phi1));
          if (y1 < y2) {
            obj1.pos[1] = y2 - Math.abs((r1 + r2) * Math.sin(phi1));
          } else {
            obj1.pos[1] = y2 + Math.abs((r1 + r2) * Math.sin(phi1));
          }
        }
      } else {
        if (x1 < x2) {
          obj2.pos[0] = x1 + Math.abs((r1 + r2) * Math.cos(phi1));
          if (y1 < y2) {
            obj2.pos[1] = y1 + Math.abs((r1 + r2) * Math.sin(phi1));
          } else {
            obj2.pos[1] = y1 - Math.abs((r1 + r2) * Math.sin(phi1));
          }
        } else {
          obj2.pos[0] = x1 - Math.abs((r1 + r2) * Math.cos(phi1));
          if (y1 < y2) {
            obj2.pos[1] = y1 + Math.abs((r1 + r2) * Math.sin(phi1));
          } else {
            obj2.pos[1] = y1 - Math.abs((r1 + r2) * Math.sin(phi1));
          }
        }
      }
      // console.log(this.distance([obj1.pos[0]+v1x, obj1.pos[1]+v1y], [obj2.pos[0]+v2x, obj2.pos[1]+v1y]) < obj1.radius+obj2.radius);
      // debugger;
    }
    obj1.vel = [v1x, v1y];
    obj2.vel = [v2x, v2y];
  }
};

module.exports = Util;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Asteroid = function () {
  function Asteroid(options) {
    _classCallCheck(this, Asteroid);

    this.game = options.game;

    if (options.radius) {
      this.radius = options.radius;
    } else {
      this.radius = 25 * Math.random() + 15;
    }

    if (options.color) {
      this.color = options.color;
    } else {
      this.color = 'red';
    }

    this.pos = options.pos;

    if (this.pos[0] - this.radius < 0) {
      this.pos[0] = this.radius;
    }
    if (this.pos[0] + this.radius > this.game.DIM_X) {
      this.pos[0] = this.game.DIM_X - this.radius;
    }
    if (this.pos[1] - this.radius < 0) {
      this.pos[1] = this.radius;
    }
    if (this.pos[1] + this.radius > this.game.DIM_Y) {
      this.pos[1] = this.game.DIM_Y - this.radius;
    }

    if (options.vel) {
      this.vel = options.vel;
    } else {
      this.vel = this.randomVec(5);
    }

    // this.color = options.color;
    // this.theta = Util.theta(this.vel);
    this.mass = 4 / 3 * Math.PI * Math.pow(this.radius, 3);
  }

  _createClass(Asteroid, [{
    key: 'draw',
    value: function draw(ctx) {
      // var grd=ctx.createRadialGradient(this.pos[0],this.pos[1],5,this.pos[0]+this.radius,this.pos[1]+this.radius,this.radius);
      // grd.addColorStop(0,'red');
      // grd.addColorStop(1,"white");
      ctx.fillStyle = this.color;
      ctx.beginPath();

      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);

      ctx.fill();
      //
      // ctx.beginPath();
      // ctx.moveTo(this.pos[0], this.pos[1]);
      // ctx.lineTo((this.pos[0]+this.vel[0]),(this.pos[1]+this.vel[1]));
      // ctx.lineWidth=2;
      // ctx.strokeStyle = "black";
      // ctx.stroke();
    }
  }, {
    key: 'move',
    value: function move() {
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
      // this.pos = this.game.wrap(this.pos, this.vel, this.radius);
      // if (this.vel[0] > 0) {
      //   // console.log("reduce");
      //   this.vel[0] *= .9;
      // }
      // if (this.vel[0] < 0) {this.vel[0] += 10}
      // if (this.vel[1] > 0) {this.vel[1] -= 10}
      // if (this.vel[1] < 0) {this.vel[1] += 10}
      // this.vel[0] *= .999;
      // this.vel[1] *= .999;
    }
  }, {
    key: 'isCollidedWith',
    value: function isCollidedWith(otherObject) {
      if (_utils2.default.distance(this.pos, otherObject.pos) <= this.radius + otherObject.radius) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'collideWith',
    value: function collideWith(otherObject) {
      _utils2.default.resolveCollison(this, otherObject, this.game.matrix);
    }
  }, {
    key: 'randomVec',
    value: function randomVec(length) {
      var deg = 2 * Math.PI * Math.random();
      return _utils2.default.scale([Math.sin(deg), Math.cos(deg)], length);
    }
  }]);

  return Asteroid;
}();

exports.default = Asteroid;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Audio = function () {
  function Audio() {
    _classCallCheck(this, Audio);

    this.context;
    this.sourceUrls;
    this.buffers = [];
  }

  _createClass(Audio, [{
    key: "init",
    value: function init() {
      var context = void 0;
      if (typeof AudioContext !== "undefined") {
        context = new AudioContext();
      } else if (typeof webkitAudioContext !== "undefined") {
        context = new webkitAudioContext();
      } else {
        throw new Error('AudioContext not supported. :(');
      }
      this.context = context;
      this.masterGain = this.context.createGain();
    }
  }, {
    key: "loadSounds",
    value: function loadSounds(sources) {
      var _this = this;

      // Note: this loads asynchronously
      sources.forEach(function (url) {
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";

        // Our asynchronous callback
        request.onload = function () {

          _this.context.decodeAudioData(request.response, function (soundBuffer) {
            // Add the buffered data to our object
            // console.log(soundBuffer);
            _this.buffers.push(soundBuffer);
          });
        };

        request.send();
      });
    }
  }, {
    key: "playSound",
    value: function playSound(i) {
      var source = this.context.createBufferSource();
      var gainNode = this.context.createGain();
      source.buffer = this.buffers[i];
      source.connect(this.masterGain);

      this.masterGain.connect(this.context.destination);
      source.start(0);
    }
  }]);

  return Audio;
}();

exports.default = Audio;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game = __webpack_require__(5);

var _game2 = _interopRequireDefault(_game);

var _drawer = __webpack_require__(4);

var _drawer2 = _interopRequireDefault(_drawer);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _asteroid = __webpack_require__(1);

var _asteroid2 = _interopRequireDefault(_asteroid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sources1 = ["sounds/epiano/epiano_c3.mp3", "sounds/epiano/epiano_d3.mp3", "sounds/epiano/epiano_e3.mp3", "sounds/epiano/epiano_f3.mp3", "sounds/epiano/epiano_g3.mp3", "sounds/epiano/epiano_a3.mp3", "sounds/epiano/epiano_b3.mp3", "sounds/epiano/epiano_c4.mp3", "sounds/epiano/epiano_d4.mp3", "sounds/epiano/epiano_e4.mp3", "sounds/epiano/epiano_f4.mp3", "sounds/epiano/epiano_g4.mp3", "sounds/epiano/epiano_a4.mp3", "sounds/epiano/epiano_b4.mp3", "sounds/epiano/epiano_c5.mp3"];
var sources2 = ["sounds/piano/piano_c2.mp3", "sounds/piano/piano_d2.mp3", "sounds/piano/piano_ef2.mp3", "sounds/piano/piano_f2.mp3", "sounds/piano/piano_g2.mp3", "sounds/piano/piano_af2.mp3", "sounds/piano/piano_bf2.mp3", "sounds/piano/piano_c3.mp3", "sounds/piano/piano_d3.mp3", "sounds/piano/piano_ef3.mp3", "sounds/piano/piano_f3.mp3", "sounds/piano/piano_g3.mp3", "sounds/piano/piano_af3.mp3", "sounds/piano/piano_bf3.mp3", "sounds/piano/piano_c4.mp3"];

var GameView = function () {
  function GameView(ctx, audio) {
    _classCallCheck(this, GameView);

    this.game = new _game2.default(audio, 4, ctx);
    this.drawer = new _drawer2.default(this.game, ctx);
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

  _createClass(GameView, [{
    key: 'init',
    value: function init() {
      var _this = this;

      var canvasEl = document.querySelector('canvas');
      var playButton = document.querySelector('.play');
      var stopButton = document.querySelector('.stop');
      var resetButton = document.querySelector('.step-backwards');
      var mute = document.querySelector('.mute');
      var random = document.querySelector('.random');
      var sounds = document.querySelector('.sounds');

      //Color boxes
      var redBox = document.querySelector('.color-box-red');
      var blueBox = document.querySelector('.color-box-blue');
      var greenBox = document.querySelector('.color-box-green');
      var yellowBox = document.querySelector('.color-box-yellow');
      var purpleBox = document.querySelector('.color-box-purple');
      redBox.className += " selected";

      // Modal handling
      var matrixModal = document.getElementById('matrix-modal');
      var modalText = document.querySelector('.modal-text');
      modalText.innerHTML = '' + this.game.matrix;
      var matrixBtn = document.getElementById("myBtn");
      var matrixClose = document.getElementsByClassName("close")[0];
      matrixBtn.onclick = function () {
        matrixModal.style.display = "block";
      };
      matrixClose.onclick = function () {
        matrixModal.style.display = "none";
      };
      window.onclick = function (event) {
        if (event.target == matrixModal) {
          matrixModal.style.display = "none";
        }
      };

      var introModal = document.getElementById('intro-modal');
      // const modalText = document.querySelector('.modal-text');
      // modalText.innerHTML = `${this.game.matrix}`;
      // const btn = document.getElementById("matrix-modal");
      var introClose = document.getElementById("close-intro");
      // btn.onclick = () => { introModal.style.display = "block"; }
      introClose.onclick = function () {
        introModal.style.display = "none";
      };
      window.onclick = function (event) {
        if (event.target == introModal) {
          introModal.style.display = "none";
        }
      };

      introModal.style.display = "block";

      //Window resizing
      window.onresize = function () {
        _this.game.updateBounds();
        _this.canvasWrapper.width = window.innerWidth - 200;
        _this.canvasWrapper.height = window.innerHeight * .75;
        _this.canvasEl.width = window.innerWidth - 200;
        _this.canvasEl.height = window.innerHeight * .75;
        _this.game.draw(_this.ctx);
      };

      //Controls
      playButton.addEventListener('click', function () {
        if (_this.playing === false) {
          _this.playing = true;
          _this.start();
        }
      });
      stopButton.addEventListener('click', function () {
        if (_this.playing === true) {
          // console.log('stop');
          _this.playing = false;
          _this.stop();
        }
      });
      resetButton.addEventListener('click', function () {
        if (_this.playing === true) {
          _this.playing = false;
          _this.stop();
          _this.game.asteroids = [];
          _this.ctx.clearRect(0, 0, _this.canvasEl.width, _this.canvasEl.height);
        } else {
          _this.stop();
          _this.game.asteroids = [];
          _this.ctx.clearRect(0, 0, _this.canvasEl.width, _this.canvasEl.height);
        }
      });
      random.addEventListener('click', function () {
        console.log("random");
        _this.ctx.clearRect(0, 0, _this.canvasEl.width, _this.canvasEl.height);
        _this.game = new _game2.default(_this.audio, _utils2.default.getRandomInt(2, 7), _this.ctx);
        _this.game.draw(_this.ctx);
      });
      mute.addEventListener('click', function () {
        if (mute.id == "mute") {
          _this.audio.masterGain.gain.value = 0;
          mute.id = "unmute";
          mute.innerHTML = "Unmute";
        } else {
          _this.audio.masterGain.gain.value = 1;
          mute.id = "mute";
          mute.innerHTML = "Mute";
        }
      });

      //Color Selectors
      redBox.addEventListener('click', function () {
        if (!redBox.classList.contains('selected')) {
          var currSelected = document.querySelector('.color-box-' + ('' + _this.selectedColor));
          currSelected.classList.remove("selected");
          redBox.className += " selected";
          _this.selectedColor = 'red';
        }
      });
      blueBox.addEventListener('click', function () {
        if (!blueBox.classList.contains('selected')) {
          var currSelected = document.querySelector('.color-box-' + ('' + _this.selectedColor));
          currSelected.classList.remove("selected");
          blueBox.className += " selected";
          _this.selectedColor = 'blue';
        }
      });
      greenBox.addEventListener('click', function () {
        if (!greenBox.classList.contains('selected')) {
          var currSelected = document.querySelector('.color-box-' + ('' + _this.selectedColor));
          currSelected.classList.remove("selected");
          greenBox.className += " selected";
          _this.selectedColor = 'green';
        }
      });
      yellowBox.addEventListener('click', function () {
        if (!yellowBox.classList.contains('selected')) {
          var currSelected = document.querySelector('.color-box-' + ('' + _this.selectedColor));
          currSelected.classList.remove("selected");
          yellowBox.className += " selected";
          _this.selectedColor = 'yellow';
        }
      });
      purpleBox.addEventListener('click', function () {
        if (!purpleBox.classList.contains('selected')) {
          var currSelected = document.querySelector('.color-box-' + ('' + _this.selectedColor));
          currSelected.classList.remove("selected");
          purpleBox.className += " selected";
          _this.selectedColor = 'purple';
        }
      });

      //Sounds Selector
      sounds.addEventListener('change', function (e) {
        _this.audio.buffers = [];
        if (e.target.value === "sources1") {
          _this.audio.loadSounds(sources1);
        }
        if (e.target.value === "sources2") {
          _this.audio.loadSounds(sources2);
        }
      });

      //Draw game
      this.game.draw(this.ctx);

      //Draw Handlers
      canvasEl.onmouseup = function (e) {
        var canvasEl = document.getElementById('canvas');
        var rect = canvasEl.getBoundingClientRect();
        _this.currPos = [e.x - rect.left, e.y - rect.top];
        var radius = _utils2.default.distance(_this.startPos, _this.currPos);
        canvasEl.onmousemove = function () {};
        var vel = _utils2.default.scale([(_this.currPos[0] - _this.startPos[0]) * .01, (_this.currPos[1] - _this.startPos[1]) * .01], _utils2.default.getRandomInt(1, 15));
        _this.game.asteroids.push(new _asteroid2.default({ pos: _this.startPos, game: _this.game, radius: radius, vel: vel, color: _this.selectedColor }));
        if (_this.playing === true) {
          _this.start();
        }
      };
      canvasEl.onmousedown = function (e) {
        if (_this.playing === true) {
          _this.stop();
        }
        var canvasEl = document.getElementById('canvas');
        var rect = canvasEl.getBoundingClientRect();
        _this.startPos = [e.x - rect.left, e.y - rect.top];
        canvasEl.onmousemove = function (e) {
          _this.ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
          _this.currPos = [e.x - rect.left, e.y - rect.top];
          _this.game.draw(_this.ctx);
          _this.lastPos = _this.currPos;
          _this.drawer.beginCircle(_this.ctx, _this.startPos, _this.currPos, _this.selectedColor);
        };
      };
    }
  }, {
    key: 'start',
    value: function start() {
      var _this2 = this;

      this.game.moveObjects();
      // this.ctx.clearRect(0,0,canvasEl.width, canvasEl.height);

      this.req = window.requestAnimationFrame(function () {
        _this2.ctx.clearRect(0, 0, _this2.canvasEl.width, _this2.canvasEl.height);
        _this2.game.draw(_this2.ctx);
        _this2.start();
      });
    }
  }, {
    key: 'stop',
    value: function stop() {
      window.cancelAnimationFrame(this.req);
    }
  }]);

  return GameView;
}();

exports.default = GameView;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Drawer = function () {
  function Drawer(game, ctx) {
    _classCallCheck(this, Drawer);

    this.game = game;
    this.ctx = ctx;
  }

  _createClass(Drawer, [{
    key: "beginCircle",
    value: function beginCircle(ctx, startPos, currPos, color) {
      ctx.fillStyle = color;
      ctx.beginPath();

      ctx.arc(startPos[0], startPos[1], _utils2.default.distance(startPos, currPos), 0, 2 * Math.PI, false);

      ctx.fill();

      var x1 = startPos[0];
      var y1 = startPos[1];
      var x2 = currPos[0];
      var y2 = currPos[1];
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black";
      ctx.stroke();
    }
  }]);

  return Drawer;
}();

exports.default = Drawer;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import Asteroid from './asteroid.js';


var _asteroid = __webpack_require__(1);

var _asteroid2 = _interopRequireDefault(_asteroid);

var _markov = __webpack_require__(6);

var _markov2 = _interopRequireDefault(_markov);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getRandomInt = function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var colorCombos = {
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
};

var Game = function () {
  function Game(audio, seed, ctx) {
    _classCallCheck(this, Game);

    this.canvasEl = document.getElementsByTagName("canvas")[0];
    this.DIM_X = this.canvasEl.width;
    this.DIM_Y = this.canvasEl.height;
    this.ctx = ctx;
    this.NUM_ASTEROIDS = seed;
    this.asteroids = [];
    this.addAsteroids();
    this.audio = audio;
    this.matrix = _markov2.default.generateMatrix(15, 15);
  }

  _createClass(Game, [{
    key: 'updateBounds',
    value: function updateBounds() {
      this.DIM_X = this.canvasEl.width;
      this.DIM_Y = this.canvasEl.height;
    }
  }, {
    key: 'addAsteroids',
    value: function addAsteroids() {
      for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
        this.asteroids.push(new _asteroid2.default({ pos: this.randomPosition(), game: this, color: 'red' }));
      }
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      this.asteroids.forEach(function (el) {
        el.draw(ctx);
      });
    }
  }, {
    key: 'drawBounce',
    value: function drawBounce(ctx, pos) {
      ctx.fillStyle = 'black';
      ctx.beginPath();

      ctx.arc(pos[0], pos[1], 30, 0, 2 * Math.PI, false);

      ctx.fill();
    }
  }, {
    key: 'moveObjects',
    value: function moveObjects() {
      this.checkWalls();
      this.asteroids.forEach(function (obj) {
        return obj.move();
      });
      this.checkCollisons();
    }
  }, {
    key: 'wrap',
    value: function wrap(pos, vel, rad) {
      var newPos = pos;
      if (pos[0] - rad > this.DIM_X && vel[0] > 0) {
        newPos[0] = 0 - rad;
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
  }, {
    key: 'checkCollisons',
    value: function checkCollisons() {
      for (var i = 0; i < this.asteroids.length; i++) {
        for (var j = i + 1; j < this.asteroids.length; j++) {
          if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
            // const a1 = this.asteroids[i]
            // const a2 = this.asteroids[j]
            // const cpx = ((a1.pos[0]*a2.radius) + (a2.pos[0]*a1.radius)) / (a1.radius + a2.radius);
            // const cpy = ((a1.pos[1]*a2.radius) + (a2.pos[1]*a1.radius)) / (a1.radius + a2.radius);
            //
            // this.drawBounce(this.ctx, [cpx, cpy])
            // let int = getRandomInt(0,15);
            var combo = this.asteroids[i].color + this.asteroids[j].color;
            var index = colorCombos[combo];

            var soundIndex = _markov2.default.resolveEvolution(index, this.matrix);
            // console.log(soundIndex);
            this.audio.playSound(soundIndex);
            this.asteroids[i].collideWith(this.asteroids[j]);
          }
        }
      }
    }
  }, {
    key: 'checkWalls',
    value: function checkWalls() {
      for (var i = 0; i < this.asteroids.length; i++) {
        var asteroid = this.asteroids[i];
        if (asteroid.pos[0] - asteroid.radius <= 0) {
          asteroid.vel[0] = -asteroid.vel[0];
          asteroid.pos[0] += 1;
        }
        if (asteroid.pos[0] + asteroid.radius >= this.DIM_X) {
          asteroid.vel[0] = -asteroid.vel[0];
          asteroid.pos[0] -= 1;
        }
        if (asteroid.pos[1] - asteroid.radius <= 0) {
          asteroid.vel[1] = -asteroid.vel[1];
          asteroid.pos[1] += 1;
        }
        if (asteroid.pos[1] + asteroid.radius >= this.DIM_Y) {
          asteroid.vel[1] = -asteroid.vel[1];
          asteroid.pos[1] -= 1;
        }
      }
    }
  }, {
    key: 'remove',
    value: function remove(obj) {
      if (obj instanceof _asteroid2.default) {
        var idx = this.asteroids.indexOf(obj);
        this.asteroids.splice(idx, 1);
      }
    }
  }, {
    key: 'randomPosition',
    value: function randomPosition() {
      var xpos = getRandomInt(0, this.DIM_X);
      var ypos = getRandomInt(0, this.DIM_Y);
      return [xpos, ypos];
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Markov = {
  generateMatrix: function generateMatrix(width, height) {
    var matrix = [];
    for (var i = 0; i < height; i++) {
      matrix.push(this.generateProbabilities(width));
    }
    return matrix;
  },
  generateProbabilities: function generateProbabilities(num) {
    var nums = [];
    var probs = [];
    for (var i = 0; i < num - 1; i++) {
      var n = Math.round(Math.random() * 100) / 100;
      // console.log(n);
      nums.push(n);
    }
    nums.sort();
    for (var i = 0; i <= nums.length; i++) {
      if (i === 0) {
        probs.push(nums[i]);
      } else if (i === nums.length) {
        probs.push(Math.round((1 - nums[i - 1]) * 100) / 100);
      } else {
        probs.push(Math.round((nums[i] - nums[i - 1]) * 100) / 100);
      }
    }
    return probs;
  },
  resolveEvolution: function resolveEvolution(rowNum, matrix) {
    if (rowNum < matrix.length) {
      var row = matrix[rowNum];
      var set = [];
      for (var i = 0; i < row.length; i++) {
        for (var j = 0; j < row[i] * 100; j++) {
          set.push(i);
        }
      }
      // console.log(set);
      return set[Math.floor(Math.random() * set.length)];
    }
  }
};

exports.default = Markov;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _audio = __webpack_require__(2);

var _audio2 = _interopRequireDefault(_audio);

var _game_view = __webpack_require__(3);

var _game_view2 = _interopRequireDefault(_game_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// window.Game = Game;
// window.Asteroid = Asteroid;
// window.MovingObject = MovingObject;
// window.GameView = GameView;
// window.Util = Util;


// const Game = require('./lib/game.js');
// const GameView = require('./lib/game_view.js');
// const Util = require('./lib/utils.js');
// const MovingObject = require('./lib/moving_object.js');
// const Asteroid = require('./lib/asteroid.js');

// const AudioTest = require('./lib/audio_test.js');
// const Drawer = require('./lib/drawer.js');

document.addEventListener("DOMContentLoaded", function (event) {

  var canvasEl = document.getElementsByTagName("canvas")[0];
  var canvasWrapper = document.getElementById("canvas-wrapper");
  canvasWrapper.width = window.innerWidth - 200;
  canvasWrapper.height = window.innerHeight * .75;
  canvasEl.width = window.innerWidth - 200;
  canvasEl.height = window.innerHeight * .75;
  var ctx = canvasEl.getContext("2d");
  var audio = new _audio2.default();

  // setTimeout(() => audio.playSound(0), 2000);
  var gv = new _game_view2.default(ctx, audio);
  gv.init();
  // gv.start();
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map