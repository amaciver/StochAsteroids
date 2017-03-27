const COLORS = ['red', 'blue', 'yellow', 'green'];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const Util = {
  inherits (childClass, parentClass) {
    childClass.prototype = Object.create(parentClass.prototype);
    childClass.prototype.constructor = childClass;
  },

  // Scale the length of a vector by the given amount.
  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  distance (pos1, pos2) {
    return Math.sqrt(Math.pow(pos1[0] - pos2[0],2) + Math.pow(pos1[1] - pos2[1], 2));
  },

  theta (vel) {
    const vmag = Math.sqrt((vel[0]*vel[0]) + (vel[1]*vel[1]));
    let theta = Math.acos(vel[0]/vmag);
    if (vmag === 0) {
      theta = 0;
    }
    if (vel[1] < 0 ) {
      theta = -theta;
    }
    if (theta < 0 ) {
      theta = 2*Math.PI + theta;
    }
    // console.log(theta);
    return theta;
  },

  magnitude (vel) {
    return Math.sqrt((vel[0]*vel[0]) + (vel[1]*vel[1]));
  },

  resolveCollison(obj1, obj2) {
    const x1 = obj1.pos[0];
    const y1 = obj1.pos[1];
    const x2 = obj2.pos[0];
    const y2 = obj2.pos[1];

    const r1 = obj1.radius;
    const r2 = obj2.radius;

    const m1 = obj1.mass;
    const m2 = obj2.mass;

    const u1 = obj1.vel;
    const u2 = obj2.vel;

    const u1mag = Math.sqrt((u1[0]*u1[0]) + (u1[1]*u1[1]));
    const u2mag = Math.sqrt((u2[0]*u2[0]) + (u2[1]*u2[1]));


    const cpx = ((x1*r2) + (x2*r1)) / (r1 + r2);
    const cpy = ((y1*r2) + (y2*r1)) / (r1 + r2);

    let phi1 = Math.atan((cpy-y1)/(cpx-x1));
    if (phi1 < 0) {
      phi1 = 2*Math.PI + phi1;
    }

    let theta1 = Math.acos(u1[0]/u1mag);
    if (u1[1] < 0 ) {
      theta1 = -theta1;
    }
    if (theta1 < 0 ) {
      theta1 = 2*Math.PI + theta1;
    }

    let theta2 = Math.acos(u2[0]/u2mag);
    if (u2[1] < 0 ) {
      theta2 = -theta2;
    }
    if (theta2 < 0 ) {
      theta2 = 2*Math.PI + theta2;
    }

    const v1x = ((( (u1mag*Math.cos(theta1-phi1)*(m1-m2)) + (2*m2*u2mag*Math.cos(theta2-phi1)) ) / (m1+m2) ) * Math.cos(phi1)) +
    ( u1mag*Math.sin(theta1-phi1)*Math.cos(phi1+(Math.PI/2)) );
    const v1y = ((( (u1mag*Math.cos(theta1-phi1)*(m1-m2)) + (2*m2*u2mag*Math.cos(theta2-phi1)) ) / (m1+m2) ) * Math.sin(phi1)) +
    ( u1mag*Math.sin(theta1-phi1)*Math.sin(phi1+(Math.PI/2)) );
    const v2x = ((( (u2mag*Math.cos(theta2-phi1)*(m2-m1)) + (2*m1*u1mag*Math.cos(theta1-phi1)) ) / (m1+m2) ) * Math.cos(phi1)) +
    ( u2mag*Math.sin(theta2-phi1)*Math.cos(phi1+(Math.PI/2)) );
    const v2y = ((( (u2mag*Math.cos(theta2-phi1)*(m2-m1)) + (2*m1*u1mag*Math.cos(theta1-phi1)) ) / (m1+m2) ) * Math.sin(phi1)) +
    ( u2mag*Math.sin(theta2-phi1)*Math.sin(phi1+(Math.PI/2)) );

    // Version without contact angles

    // const v1x = ( (u1[0]*(m1-m2) + 2*m2*u2[0]) / (m1 + m2));
    // const v1y = ( (u1[1]*(m1-m2) + 2*m2*u2[1]) / (m1 + m2));
    // const v2x = ( (u2[0]*(m2-m1) + 2*m1*u1[0]) / (m1 + m2));
    // const v2y = ( (u2[1]*(m2-m1) + 2*m1*u1[1]) / (m1 + m2));
    const rand1 = getRandomInt(0,4);
    const rand2 = getRandomInt(0,4);
    obj1.color = COLORS[rand1];
    obj2.color = COLORS[rand2];

    obj1.vel = [v1x, v1y];
    obj2.vel = [v2x, v2y];
  }
};

module.exports = Util;