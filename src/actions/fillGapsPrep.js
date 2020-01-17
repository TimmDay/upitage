import { shuffleInPlace } from '../utils/arrayTools'
import { enPrepositionsCommon, enPrepositionsTrickier } from '../utils/POS/en-common-prep'
import { GAP_BLANK } from '../constants/constants';

export const clearFGPData = () => ({ type: 'CLEAR_FTGPREP_DATA' })

export const startGenFGP = () => {
  return async (dispatch, getState) => {
    const wordsBySent = getState().inputTextData.wordsBySent
    const tagsBySent = getState().inputTextData.tagsBySent

    let exercisesFGP = []
    
    // go through each sentence
    tagsBySent.forEach((sent, i) => {
      //only make exercises only for sentences < 33 words
      if (sent.length > 33) return
      
      let sentenceArr = [] // strings for words, GAP_BLANK for preps
      let answerSets = [] // objs like [{ value: 'word', correct: bool }], in order of prep appearance in sentence
      let atLeastOnePrep = false

      // check each tag of this sent
      sent.forEach((tag,j) => {
        //IN -> preposition, TO -> 'to'
        if (tag[0] == 'I' || tag[0] == 'T') { //check first char of each tag for preposition
          atLeastOnePrep = true
          sentenceArr.push(GAP_BLANK)
          answerSets.push([{ 
            word: wordsBySent[i][j], 
            correct: true,
            indexInSentence: j
          }])
        } else {
          sentenceArr.push(wordsBySent[i][j]) //add the non-prep word for render
        }
      }) 

      // need at least one prep in sentence to be a viable exercise
      if (!atLeastOnePrep) return; //abandon this sentence, go to next

      // add confounding answers to answer set
      answerSets.forEach(answerSet => {
        const correct = answerSet[0].word
        let commonList = enPrepositionsCommon
        let trickierList = enPrepositionsTrickier

        // avoid dbl answers, remove correct answer from the relevant confounding list
        if (commonList.includes(correct)) commonList.splice(commonList.indexOf(correct),1)
        else if (trickierList.includes(correct)) trickierList.splice(trickierList.indexOf(correct),1)
        
        const word1 = enPrepositionsCommon[Math.floor(Math.random() * enPrepositionsCommon.length)]
        const word2 = enPrepositionsCommon[Math.floor(Math.random() * enPrepositionsCommon.length)]
        const word3 = enPrepositionsTrickier[Math.floor(Math.random() * enPrepositionsTrickier.length)]

        answerSet.push({ word: word1, correct: false })
        answerSet.push({ word: word2, correct: false })
        answerSet.push({ word: word3, correct: false })
      // shuffle the answer set
        shuffleInPlace(answerSet) 
      })

      // submit to exercise arr
      exercisesFGP.push({ 
        sentence: sentenceArr, 
        answerSet: answerSets,
        trackUserAnswers: Array.from(Array(answerSets.length), () => 0)
      })
    })

    // shuffle the exercises arr
    shuffleInPlace(exercisesFGP)

    // store in redux
    dispatch(storeFGP(exercisesFGP))
  }
}

const storeFGP = (exercisesFGP) => ({
  type: 'STORE_FGP_EX',
  exercisesFGP: exercisesFGP
})

export const updateCorrectAnswer = (exIndex, ansIndex) => ({
  type: 'UPDATE_CORRECT_ANSWER',
  exIndex,
  ansIndex
})
