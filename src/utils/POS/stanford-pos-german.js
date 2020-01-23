const fs = require('fs');

// const text = "Tim Day has made this damn thing work!"
const text = "Die Katze lief um den Baum herum."
// const text = "Trump eröffnet offiziell Wahlkampf US-Präsident Donald Trump hat offiziell seinen Wahlkampf für eine zweite Amtszeit eingeläutet. Seine Rede vor rund 20.000 Anhängern in Orlando im Bundesstaat Florida begann er mit einem Angriff auf die Medien. Trump will sich 2020 erneut ins Weiße Haus wählen lassen. Die Vorwahlen zur Bestimmung der Kandidaten beginnen im Februar. An der erneuten Nominierung Trumps durch die Republikaner gibt es keinen Zweifel. Bei den Demokraten gibt es derzeit 23 Präsidentschaftsbewerber. Bei ihnen liegt laut Umfragen Ex-Vizepräsident Joe Biden vorn."
// const text = "el gato corrió alrededor del árbol"

const doTag = (text) => {
  (async () => {
    const POS = require("../../node_modules/stanford-postagger")
    const pos = new POS({model: 'german'})
    await pos.start()
    await pos.tag(text).then((data) => {
        console.log(data)
        fs.writeFile("german.txt", data, function(err) {
          if(err) { return console.log(err) }
          console.log("The file was saved!");
        }); 
    })
    await pos.stop()
  })().catch(err => console.log(`ERROR: ${err}`))
}

doTag(text)



// PSEUDO
// on text submit
// 1. segment text into sentences
// 2. go through each sentence
  // 2a. postag it
  // 2b. evaluate if it is viable for an exercise
    // if yes, generate an exercise
    // display exercise on dashboard
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


