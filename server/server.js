const path = require('path');
const express = require('express');
const posTagEnWord = require('./../src/utils/POS/stanford-pos-english');
const translateEnWord = require('./../src/utils/googleTranslate/translate');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

// console.log('here is PORT variable: ', process.env.PORT);
// console.log('here is PORT variable: ', process.env);


app.use(express.static(publicPath));

// build endpoint for getting the POS tag output for english text

// TODO: mvp. get one word accross
app.get('/treated-text', (req,res) => {
  if (!req.query.word) {
    return res.send({
      error: 'you must provide the word to postag'
    })
  }
  posTagEnWord(req.query.word)
  .then(data => {
    res.send({
      tag: data
    })
  });
})

app.get('/translated-text', (req,res) => {

  console.log('QUERY WORD: ', req.query.word);
  

  if (!req.query.word) {
    return res.send({
      error: 'you must provide the word to translate'
    })
  }
  translateEnWord(req.query.word)
  .then(data => {
    console.log(data);
    
    // res.send({
    //   tag: data
    // })
  });
})



app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log('Server is up!');
});
