import async from 'async'
import { shuffleInPlace } from '../utils/arrayTools'
import { enPrepositionsCommon, enPrepositionsTrickier } from '../utils/POS/en-common-prep';
import { GAP_BLANK } from '../resources/constants';


export const clearFGPData = () => ({ type: 'CLEAR_FTGPREP_DATA' })

export const startGenFGP = () => {
  return async (dispatch, getState) => {
    const wordsBySent = getState().inputTextData.wordsBySent
    const tagsBySent = getState().inputTextData.tagsBySent
    
    let exercisesFGP = []
    
    // go through each sentence
    await tagsBySent.forEach(async (sent, i) => {
      //only make exercises only for sentences < 33 words
      if (sent.length > 35) return
      
      let sentenceArr = [] // strings for words, GAP_BLANK for preps
      let answerSets = [] // objs like [{ value: 'word', correct: bool }], in order of prep appearance in sentence
      let atLeastOnePrep = false

      // check each tag of this sent
      await sent.forEach(async (tag,j) => {
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

      // add confounding answers to each answer set (currently contains only correct)

      async.each(answerSets, async (answerSet) => {        
        const correct = answerSet[0].word


        // TODO: trials. Use wordEmbeddings or wordFreq
        const useWordEmbeddings = false;

        if (useWordEmbeddings) {
          const res = await fetch('http://localhost:3000/n-most-similar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow',
            body: JSON.stringify({target: correct, n: 12})
          })
          let similarList = await res.json();

          const word1 = similarList.splice(Math.floor(Math.random() * similarList.length),1);
          const word2 = similarList.splice(Math.floor(Math.random() * similarList.length),1);
          const word3 = similarList.splice(Math.floor(Math.random() * similarList.length),1);

          answerSet.push({ word: word1, correct: false })
          answerSet.push({ word: word2, correct: false })
          answerSet.push({ word: word3, correct: false })

        } else {
          let commonList = enPrepositionsCommon; // an array
          let trickierList = enPrepositionsTrickier

          // avoid dbl answers, remove correct answer from the relevant confounding list
          if (commonList.includes(correct)) commonList.splice(commonList.indexOf(correct),1)
          if (trickierList.includes(correct)) trickierList.splice(trickierList.indexOf(correct),1)
          
          const word1 = commonList.splice(Math.floor(Math.random() * commonList.length),1)
          const word2 = commonList.splice(Math.floor(Math.random() * commonList.length),1)
          const word3 = trickierList.splice(Math.floor(Math.random() * trickierList.length),1)

          answerSet.push({ word: word1, correct: false })
          answerSet.push({ word: word2, correct: false })
          answerSet.push({ word: word3, correct: false }) 
        }

      // shuffle the answer set
        await shuffleInPlace(answerSet) 
      }) //end foreach answersets

      // to redux
      exercisesFGP.push({ 
        sentence: sentenceArr, 
        answerSet: answerSets,
        trackUserAnswers: Array.from(Array(answerSets.length), () => 0)
      })
    }) // end foreach tagsBySent

    // shuffle the exercises arr
    await shuffleInPlace(exercisesFGP)
    
    // TODO: BUG if using word embeddings, program gets here too early
    // store in redux
    
    await dispatch(storeFGP(exercisesFGP))
    console.log('STORED IN REDUX')
    
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
