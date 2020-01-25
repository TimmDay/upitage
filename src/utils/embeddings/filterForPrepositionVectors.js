const fs = require('fs');
const posTag = require('./stanford-pos-english');
const LineByLineReader = require('line-by-line');

// when reading huge files (like word vector corpora) 
// it is important to do the processing of each line syncronously
// otherwise things will crash with too many threads going at once

const writeStream = fs.createWriteStream('glove_prep_vectors.txt'); //write to
const lr = new LineByLineReader('glove.6B.300d.txt'); //read from 

lr.on('line', function (line) {
  const wordOfVector = line.toString().split(' ')[0]; 
  console.log(wordOfVector);
  
    // pause emitting of lines... 
    // until pos check and write is finished for this line
    lr.pause();

    posTag(wordOfVector).then((result) => {
      const postag = result.split('_')[1];
      console.log(postag)
      if (postag === 'IN' || postag === 'TO') {
        console.log('PREPOSITION:::::::::::')
        writeStream.write(`${line}\n`, 'utf8')
      }
    }).then(() => lr.resume())
});


lr.on('error', function (err) {
  // 'err' contains error object
});

lr.on('end', () => console.log('filtering of file for preposition vectors is finished'));