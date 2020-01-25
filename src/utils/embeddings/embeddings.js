const fs = require('fs')

/**
 * build a map data structure of word vectors
 * @param {string} fileName, to txt file with GLoVE format. each line (word 0.234 -2.4234 ,,,)
 * @returns {Map} keys are the word, value is the word vector
 */
const buildVectorMap = (fileName) => {
  let map = new Map()
  const lines = fs.readFileSync(fileName).toString().split('\n');
    lines.forEach((line) => {
      line = line.split(/\s/);
      const key = line[0];
      let dims = []
      for (let i=1; i<line.length; i++) {
        dims[i-1] = parseFloat(line[i])
      }
      map.set(key, dims)
    })   
  return map
}

/**
 * Compute the dot product of two vectors.
 */
const dotProduct = (arrVecA, arrVecB) => {
  // vectors can only contain number types
  if (arrVecA.length !== arrVecB.length) throw "vectors must be the same length to compute dot product"
  let result = 0;
  arrVecA.forEach((elA, i) => result += elA * arrVecB[i])
  return result;
}

/**
 * Compute the cosine similarity of two vectors
 */
const cosineSimilarity = (arrVecA, arrVecB) => {
  // vectors can only contain number types
  if (arrVecA.length !== arrVecB.length) throw "vectors must be the same length to compute cosine similarity"
  let result = 0;
  const numerator = dotProduct(arrVecA,arrVecB);
  const denominatiorA = Math.sqrt(dotProduct(arrVecA,arrVecA));
  const denominatiorB = Math.sqrt(dotProduct(arrVecB,arrVecB));
  result = numerator / (denominatiorA * denominatiorB);
  return result;
}


/**
 * Return the n words that are the most similar to the given embedding.
 * @param target The target word. must be a preposition on the list
 * @param n length of list of most similar results.
 * @param map keys being the word and arrVecs the values
 * Uses the precontructed of preposition vectors 'glove_prep_vectors.txt'
 */
const nMostSimilar = (target, n, map) => {
  // target must be string
  // map must be a map
  // target must be on list
  target = target.toLowerCase()

  // go through each item on map, compare similarity with target, store the n closest
  const targetVector = map.get(target)
  const keys = map.keys()
  const compare = (a,b) => (a[1] > b[1]) ? -1 : ((a[1] < b[1]) ? 1 : 0)

  let nArr = []
  for (k of keys) {
    if (k === target) continue
    const compareVector = map.get(k)
    const similarity = cosineSimilarity(targetVector, compareVector)

    if (nArr.length < n) {
      nArr.push([k,similarity])
      nArr.sort(compare)
    } else {
      if (similarity > nArr[n-1][1]) {
        nArr.pop()
        nArr.push([k,similarity])
        nArr.sort(compare)
      }
    }
  }
  console.log(nArr)
  return nArr.map((el) => el[0]) //return just the strings
}

const nLeastSimilar = (target, n, map) => {
  // target must be string
  // map must be a map
  // target must be on list
  target = target.toLowerCase()

  // go through each item on map, compare similarity with target, store the n closest
  const targetVector = map.get(target)
  const keys = map.keys()
  const compare = (a,b) => (a[1] < b[1]) ? -1 : ((a[1] > b[1]) ? 1 : 0)

  let nArr = []
  for (k of keys) {
    if (k === target) continue
    const compareVector = map.get(k)
    const similarity = cosineSimilarity(targetVector, compareVector)

    if (nArr.length < n) {
      nArr.push([k,similarity])
      nArr.sort(compare)
    } else {
      if (similarity < nArr[n-1][1]) {
        nArr.pop()
        nArr.push([k,similarity])
        nArr.sort(compare)
      }
    }
  }
  console.log(nArr)
  return nArr.map((el) => el[0]) //return just the strings
}
// TESTS
// const arrA = [1,2,3]
// const arrB = [1,2,3]
// console.log(dotProduct(arrA, arrB)) //14

// const a = [2, 0, 1, 1, 0, 2, 1, 1]
// const b = [2, 1, 1, 0, 1, 1, 1, 1]
// console.log(cosineSimilarity(a,b)) //~0.82

// const prepMap = buildVectorMap('./glove.6B.300d.txt')
const prepMap = buildVectorMap('./glove_prep_vectors.txt')
console.log(nMostSimilar('of', 25, prepMap))
console.log(nLeastSimilar('of', 25, prepMap))