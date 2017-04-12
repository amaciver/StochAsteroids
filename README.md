# StochAsteroids **Music Generator**
## [LIVE](https://amaciver.github.io/StochAsteroids/)

### Overview

StochAsteroids (Stochastic-Asteroids) combines the satisfying physics of joyfully bouncing asteroids with pleasant tones that evolve into calming soundscapes.

You can draw your own groups of asteroids, or randomly seed the stage. When you hit play, the asteroids will move and interact and produce **lovely music**.

### Technologies

- Vanilla `JavaScript` for overall structure and game logic,
- `HTML5 Canvas` for DOM manipulation and rendering,
- `Web Audio API` for sound generation, processing and control.

### Features

#### Bouncing happily!
![example-loop-hd](images/example-loop2.gif)
<!-- ![example-loop](images/example-loop.gif) -->

#### Random seed and drawing
![example-random-seed](images/example-random-seed2.gif)

### Select sound sets
![select-sounds](images/select-sounds.gif)

### Physics

The asteroids have spherical mass, and collisions are resolved with momentum-conserving calculations.
```javascript
//new velocities
const v1x = ((( (u1mag*Math.cos(theta1-phi1)*(m1-m2)) + (2*m2*u2mag*Math.cos(theta2-phi1)) ) / (m1+m2) ) * Math.cos(phi1)) +
( u1mag*Math.sin(theta1-phi1)*Math.cos(phi1+(Math.PI/2)) );
const v1y = ((( (u1mag*Math.cos(theta1-phi1)*(m1-m2)) + (2*m2*u2mag*Math.cos(theta2-phi1)) ) / (m1+m2) ) * Math.sin(phi1)) +
( u1mag*Math.sin(theta1-phi1)*Math.sin(phi1+(Math.PI/2)) );
const v2x = ((( (u2mag*Math.cos(theta2-phi1)*(m2-m1)) + (2*m1*u1mag*Math.cos(theta1-phi1)) ) / (m1+m2) ) * Math.cos(phi1)) +
( u2mag*Math.sin(theta2-phi1)*Math.cos(phi1+(Math.PI/2)) );
const v2y = ((( (u2mag*Math.cos(theta2-phi1)*(m2-m1)) + (2*m1*u1mag*Math.cos(theta1-phi1)) ) / (m1+m2) ) * Math.sin(phi1)) +
( u2mag*Math.sin(theta2-phi1)*Math.sin(phi1+(Math.PI/2)) );
```

I wrote my own collision detection, and collisions accurately reflect the point of contact.

I also had to write code to handle situations where the frame rate would place objects inside each other before the collision could be resolved.

```javascript
//adjust position of faster object to ideal contact point to avoid capturing
if (this.distance([x1+v1x, y1+v1y], [x2+v2x, y2+v1y]) < obj1.radius+obj2.radius) {
  if (u1mag > u2mag) {
    if (x1<x2) {
      obj1.pos[0] = x2 - Math.abs( (r1+r2)*Math.cos(phi1) );
      if (y1<y2) {
        obj1.pos[1] = y2 - Math.abs( (r1+r2)*Math.sin(phi1) );
      } else {
        obj1.pos[1] = y2 + Math.abs( (r1+r2)*Math.sin(phi1) );
      }
    } else {
      obj1.pos[0] = x2 + Math.abs((r1+r2)*Math.cos(phi1) );
      if (y1<y2) {
        obj1.pos[1] = y2 - Math.abs((r1+r2)*Math.sin(phi1) );
      } else {
        obj1.pos[1] = y2 + Math.abs((r1+r2)*Math.sin(phi1) );
      }
    }
  } else {
    if (x1<x2) {
      obj2.pos[0] = x1 + Math.abs( (r1+r2)*Math.cos(phi1) );
      if (y1<y2) {
        obj2.pos[1] = y1 + Math.abs( (r1+r2)*Math.sin(phi1) );
      } else {
        obj2.pos[1] = y1 - Math.abs( (r1+r2)*Math.sin(phi1) );
      }
    } else {
      obj2.pos[0] = x1 - Math.abs((r1+r2)*Math.cos(phi1) );
      if (y1<y2) {
        obj2.pos[1] = y1 + Math.abs((r1+r2)*Math.sin(phi1) );
      } else {
        obj2.pos[1] = y1 - Math.abs((r1+r2)*Math.sin(phi1) );
      }
    }
  }
}
```


### Evolutions

Behind the scenes, sounds are determined by the color of the colliding objects. I use Markov chains to govern the probabilities of sound and color events. Markov chains are constructed using matrices of probabilities that connect the input state to the output state.

For example, here is a diagram showing some probabilities for a red colliding object's next color:

![color-evolution](images/color-evolution-diagram.png)

### Sound

I implemented the `Web Audio API`. This involved constructing a global audio object, as well as functions for loading sound files into buffers from which they can be read. I dynamically create audio node objects when collision events are triggered and connect them to the Audio Graph.

```javascript
playSound(i) {
  let source = this.context.createBufferSource();
  let gainNode = this.context.createGain();
  source.buffer = this.buffers[i];
  source.connect(this.masterGain);

  this.masterGain.connect(this.context.destination);
  source.start(0);
}
```

## Future Directions

There are many directions in which this project could evolve.

- [ ] Allow the user to alter the Markov matrix governing color evolutions
- [ ] Allow the user to alter the matrix connecting color states to pitches
- [ ] Add recording and saving of output
- [ ] Allow users to import their own sounds
- [ ] Add more complex sound processing to the audio nodes, such as distortion and convolution
- [ ] Allow users to draw obstacles and restrictive spaces into the interaction environment
