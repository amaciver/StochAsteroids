const Markov = {

  generateMatrix(width, height) {
    let matrix = [];
    for (var i = 0; i < height; i++) {
      matrix.push(this.generateProbabilities(width))
    }
    return matrix;
  },

  generateProbabilities(num) {
    let nums = [];
    let probs = [];
    for (var i = 0; i < num-1; i++) {
      let n = Math.round(Math.random()*100)/100;
      // console.log(n);
      nums.push(n);
    }
    nums.sort();
    for (var i = 0; i <= nums.length; i++) {
      if (i===0) {
        probs.push(nums[i])
      } else if (i === nums.length){
        probs.push(Math.round((1-nums[i-1])*100)/100)
      } else {
        probs.push(Math.round((nums[i]-nums[i-1])*100)/100)
      }
    }
    return probs;
  },

  resolveEvolution(rowNum, matrix) {
    if (rowNum < matrix.length) {
      let row = matrix[rowNum];
      let set = [];
      for (var i = 0; i < row.length; i++) {
        for (var j = 0; j < row[i]*100; j++) {
          set.push(i)
        }
      }
      console.log(set);
      return set[Math.floor(Math.random() * set.length)];
    }
  }


}

export default Markov;
