// const path = require('path');
const express = require('express');
const posTagEn = require('./../src/utils/POS/stanford-pos-english');
// const translateEnWord = require('./../src/utils/googleTranslate/translate');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()) //important. express has a parser to parse request data as json
// const publicPath = path.join(__dirname, '..', 'public');

//use middleware to attach headers to all responses so to allow API consupmtion by webapp
// ie: avoid CORS error
app.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  //browser cheks if it can make the request
  //which options do i have? says the browser
  if (req.method === 'OPTIONS') { 
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json()
  }
  next()
})
// * gives access to any client. could also restrict it, ie localhost:8080...
// console.log('here is PORT variable: ', process.env.PORT);
// console.log('here is PORT variable: ', process.env);

// app.use(express.static(publicPath));


app.post('/postag-text', async (req,res) => {
  const text = req.body.text // TODO: text is a required property on body
  console.log('text received')
  
  if (!text) return res.status(400).send()
  try {
    const taggedText = await posTagEn(text)
    console.log('pos tagging successful')
    res.send({ tag: taggedText })
  } catch (err) { res.status(500).send(err)}
})


// TODO: mvp. get one word accross
app.get('/postag-word', (req,res) => {
  console.log('in server') //TODO:

  if (!req.query.word) {
    return res.send({
      error: 'you must provide the word to postag'
    })
  }
  posTagEnWord(req.query.word)
  .then(data => {
    console.log(data)
    res.send({ tag: data })
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
  res.send({ error: 'there was as error' })
  // res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log('Server is up!');
});
