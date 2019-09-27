const posTagEn = word => {
  return (async () => {
    const POS = require("stanford-postagger")
    const pos = new POS({model: 'english'})
    await pos.start()
    return await pos.tag(word)
    .then((data) => {
      console.log(data);
      pos.stop()
      return data
    })
  })().catch((err) => console.log(`ERROR: ${err}`))
}

module.exports = posTagEn


// TEST
// node src/utils/POS/stanford-pos-english
// posTagEn('dog') //expect dog_NN
// posTagEn('the dog went to the park') 
//expect: the_DT dog_NN went_VBD to_TO the_DT park_NN
//super long one
// posTagEn("POWERHOUSE Geelong forward Tom Hawkins is set to miss next week's preliminary final with Richmond after being hit with a one-match ban for his off-the-ball strike on West Coast defender Will Schofield on Friday night. On a night when the Cats avoided slumping to a straight-sets finals exit after finishing on top of the ladder, the Virgin Australia AFL All Australian full-forward was charged with striking Schofield in the third term with his right arm. Schofield stayed down for a little while and looked dazed as Hawkins came over to check on the veteran Eagle and seemingly offer an apology. Given there is no risk of longer sanction, the Cats seem likely to challenge the ban at the Tribunal, which will likely be held on Monday night.")



// const text = "Tim Day has made this damn thing work!"

// const doTag = text => {
//   (async () => {
//     const POS = require("stanford-postagger")
//     const pos = new POS({model: 'english'})
//     await pos.start()
//     await pos.tag(text).then((data) => {
//         console.log(data)
//         fs.writeFile("english.txt", data, function(err) {
//           if(err) { return console.log(err) }
//           console.log("The file was saved!");
//         }); 
//     })
//     await pos.stop()
//   })().catch((err) => console.log(`ERROR: ${err}`))
// }
// doTag(text)



// PSEUDO
// on text submit
// 1. segment text into sentences
// 2. go through each sentence
  // 2a. postag it
  // 2b. evaluate if it is viable for an exercise
    // if yes, generate an exercise
      // create route, data store in redux, icon on dash

// 3. While cycling sentences, create a data store of
  // prepositions
  // articles


// EXERCISES.

// fill the blanks. find sentences with a preposition. 
  // display sentence, with a blank in place of PP
    // (also show, mostly greyed out, the sentence before and after)
  // user can choose from 4 or 6 options, from the PP data store

// choose the article (case training)
  // find a sentence with an article (or 2)
  // user has to select which article fits


// TEXT VISUALISATION
// display the whole text
// user can highlight verbs, nouns, PPs, etc.


