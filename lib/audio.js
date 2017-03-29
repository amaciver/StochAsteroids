

class Audio {
  constructor(sourceUrls) {
    this.context;
    this.sourceUrls = sourceUrls;
    this.buffers = [];

  }

  init() {
    let context;
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

  loadSounds() {
      // Note: this loads asynchronously
      this.sourceUrls.forEach( (url) => {
        let request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";

        // Our asynchronous callback
        request.onload = () => {

          this.context.decodeAudioData(request.response, (soundBuffer) => {
              // Add the buffered data to our object
              console.log(soundBuffer);
              this.buffers.push(soundBuffer);
            })
          };

        request.send();
      });
  }

  playSound(i) {
    let source = this.context.createBufferSource();
    let gainNode = this.context.createGain();
    source.buffer = this.buffers[i];
    source.connect(this.masterGain);

    this.masterGain.connect(this.context.destination);
    source.start(0);
  }
}

export default Audio;
