import { shuffleInPlace } from '../utils/arrayTools'

// we want to collect the (shorter) sentences from the text that
  // - have at least 1 preposition

// and store this info in an array prepExecises, 
  // whose members are tuples
  // - sentence (array of strings, with blanks for the preps) 
  // - array of possibleAnswerSets (array) (for each blank)
    // contains tuples. answer, and whether it is correct or not

export const startGenFGP = () => {
  return async (dispatch, getState) => {
    const wordsBySent = getState().inputTextData.wordsBySent
    const tagsBySent = getState().inputTextData.tagsBySent

    let exercisesFGP = []
    
    // go through each sentence
    tagsBySent.forEach((sent, i) => {
      // restriction: exercises only for shorter sentences
      if (sent.length > 33) {
        // do nothing
      } else {
        let sentenceArr = [] //will contains strings for words, with ___ for preps
        let answerSets = [] // will contain arr of [{ value: 'word', correct: bool }], in order of prep appearance in sentence  

        // go through each tag of this sent
        sent.forEach((tag,j) => {
          if (tag[0] == 'I' || tag[0] == 'T') { //check first char of each tag for preposition
            sentenceArr.push('___')
            answerSets.push([{ word: wordsBySent[i][j], correct: true }])
          } else {
            sentenceArr.push(wordsBySent[i][j])
          }
        }) 

        // add confounding answers to answer set
        answerSets.forEach(set => {
          set.push({ word: 'random', correct: false }) //TODO:
          set.push({ word: 'random', correct: false }) //TODO:
          set.push({ word: 'random', correct: false }) //TODO:
        // shuffle the answers
          shuffleInPlace(set) 
        })

        // submit to exercise arr
        exercisesFGP.push({ sentence: sentenceArr, answerSet: answerSets })
      }
    })

    // shuffle the exercises arr?
    shuffleInPlace(exercisesFGP)
    console.log(exercisesFGP)


    // store in redux
    dispatch(storeFGP(exercisesFGP))
  }
}

const storeFGP = (exercisesFGP) => ({
  type: 'STORE_FGP_EX',
  exercisesFGP: exercisesFGP
})
