import Util from './utils.js';

class Asteroid {
  constructor(options) {

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
    this.mass = (4/3) * Math.PI * Math.pow(this.radius, 3);
  }

  draw(ctx) {
    // var grd=ctx.createRadialGradient(this.pos[0],this.pos[1],5,this.pos[0]+this.radius,this.pos[1]+this.radius,this.radius);
    // grd.addColorStop(0,'red');
    // grd.addColorStop(1,"white");
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
    //
    // ctx.beginPath();
    // ctx.moveTo(this.pos[0], this.pos[1]);
    // ctx.lineTo((this.pos[0]+this.vel[0]),(this.pos[1]+this.vel[1]));
    // ctx.lineWidth=2;
    // ctx.strokeStyle = "black";
    // ctx.stroke();
  }

  move() {
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

  isCollidedWith(otherObject) {
    if (Util.distance(this.pos, otherObject.pos) <= (this.radius + otherObject.radius)) {
      return true;
    }
    else { return false; }
  }

  collideWith(otherObject) {
    Util.resolveCollison(this, otherObject, this.game.matrix);
  }

  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  }
}

export default Asteroid;
