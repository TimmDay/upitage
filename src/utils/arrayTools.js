// knuth shuffle algo 
// returns same array in different order
export const shuffleInPlace = (array) => {
  let currIndex = array.length;
  let tempValue, randInd;

  // While there remain elements to shuffle...
  while (0 !== currIndex) {
      // Pick a remaining element...
      randInd = Math.floor(Math.random() * currIndex);
      currIndex -= 1;

      // And swap it with the current element.
      tempValue = array[currIndex];
      array[currIndex] = array[randInd];
      array[randInd] = tempValue;
  }
  return array;
};


export const shuffleCopy = (array) => {
  let newArr = array.slice() //copy the array, without slice will shuffle the original
  let currIndex = newArr.length;
  let tempValue, randInd;

  // While there remain elements to shuffle...
  while (0 !== currIndex) {
      // Pick a remaining element...
      randInd = Math.floor(Math.random() * currIndex);
      currIndex -= 1;

      // And swap it with the current element.
      tempValue = newArr[currIndex];
      newArr[currIndex] = newArr[randInd];
      newArr[randInd] = tempValue;
  }
  return newArr;
};