import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AnswerTrackerFTGP from './AnswerTrackerFTGP';
import { updateCorrectAnswer } from '../actions/fillGapsPrep'

// next gap btn disabled if all questions are answered 

// count num of answer sets (= total questions)
// track num correct for a percentage
// track 'score' for user

// make focus auto go to first btn, so user can tab through them and press enter
// focused gap gets a nice 'blur' css style
// first gap in sentence has class 'active' (gap corresponds with index of answer set)

// correct score gives points and fills in the answer with green text, 
// incorrect score minuses some points, fills in nothing and movs to next gap

// if user clicks next Ex before filling all gaps, how can they come back to it?
  // remove any score from the exercise, put it to back of queue

//handleClickGap
  //changes the answerSet to that gap

const FillTheGapsPrep = (props) => {

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [indexGapFocus, setIndexGapFocus] = useState(0);

  const handleClickNextEx = async () => {
    const numExercises = await props.exercises.length
    
    // TODO: clear given answers
    // everything with class ftgp__sentence-gap is turned back into ____
    
    if (exerciseIndex < numExercises-1) {
      await setExerciseIndex(exerciseIndex + 1)
      await setIndexGapFocus(0)
    } else {
      await setExerciseIndex(0)
      await setIndexGapFocus(0)
    }
  }

  /**
   * knows which exercise user is in
   * which gap of that exercise
   * results in proper render of the answer set for that exercise
   */
  const handleClickNextGapInEx = async () => {
    // increment indexGapFocus, causing re-render
    console.log(`exerciseIndex: ${exerciseIndex}`)

    const maxAnswerSetIndex = props.exercises[exerciseIndex].answerSet.length
    console.log(`maxAnswerSetIndex: ${maxAnswerSetIndex}`)

    const currentIndexGapFocus = indexGapFocus
    console.log(`current indexGapFocus: ${currentIndexGapFocus}`)

    if (currentIndexGapFocus < maxAnswerSetIndex) { //increment 
      await setIndexGapFocus(indexGapFocus + 1)
      console.log(`indexGapFocus: ${indexGapFocus}`)
      // remove highlight class from other elements
      // add highlight class to this element
    } else {
      await setIndexGapFocus(0)
    }
    console.log(`indexGapFocus: ${indexGapFocus}`)
    console.log('back to start')
  }

  //TODO:
  const replaceAllAnswersWithGaps = () => {

  }

  //TODO:
  const handleClickGap = (evt) => {
    console.log(evt.target)
    
    //get the index of the gap
    // just count it
      // get posn in html coll
      // count gaps before it

    // give the gap class highlighted,
    // remove class from other gaps
  }

  const handleClickAnswer = (evt, a) => {
    
    if (a.correct) {
      console.log(a.indexInSentence)
      console.log(indexGapFocus)
      console.log(props.exercises[exerciseIndex].answerSet.length-1)

      // if all answers for exercise are correct -> redux update

      // move focus to next gap (IFF there is another gap)
      // TODO: slide transition in the next answer set
      const lastGapIndex = props.exercises[exerciseIndex].answerSet.length-1
      if (indexGapFocus < lastGapIndex) {
        handleClickNextGapInEx()
      } else {
        // TODO: if still unfilled gaps, go to the first remaining
        // add focus
        // if not unfilled gaps, some sort of congrats animation and head to next exercise
      }

      // render the correct word in the sentence gap
      document.getElementsByClassName('ftgp__sentence-word')[a.indexInSentence].textContent = ` ${a.word} `
      
      // [] update redux tracker for correct answer
      console.log('CLICKED ANSWER FOR GAP: ' + indexGapFocus)
      // exIndex, ansIndex
      props.updateCorrectAnswer(exerciseIndex, indexGapFocus)

      // can we change it in the data instead?
    } else {
      evt.target.className = 'ftgp__answer-btn ftgp__btn-incorrect'

    }
    // if all sentence gaps are full, move focus to the arrow for the next exercise
  }

  // TODO:
  // gaps get a special highlight, especially when active
  // filled in words get the preposition color
  const GAP_RENDER = '___'

  return (
    <div className='content-container'>
      {/* <p className='ftgp__title'>Fill The Gaps!</p> */}

      <div className='ftgp__sentence slide-in'>
      {
        props.exercises[exerciseIndex].sentence.map((w,i) => {
          let wordClasses = 'ftgp__sentence-word'
          // let clickFcn
          if (w === GAP_RENDER) { //TODO: gap may change. put it in a global constants file at some point
            console.log('gap here, add to className')
            wordClasses += ' ftgp__sentence-gap'
          }
          return (
          <span
            key={`key${w}${i}`}
            className={wordClasses}
            onClick={(w === GAP_RENDER) ? handleClickGap : ()=>console.log('gap click')} //TODO: ask if ok on SO
          >
            {/[.',]/.test(w[0]) ? `${w}` : ` ${w}`}
            {/* {`${w} `} */}
          </span>
        )})
      }
      </div>

      <div className='ftgp__answer-set'>
        {
          props.exercises[exerciseIndex].answerSet[indexGapFocus].map((a,i) => (
            <button
              key={`key${a.word}${i}`}
              className='ftgp__answer-btn'
              onClick={(evt) => handleClickAnswer(evt, a)}
              onMouseDown={(evt) => evt.preventDefault()}
            >{`${a.word}`}</button>
          ))
        }
        <button
          className='ftgp__answer-btn'
          onClick={handleClickNextGapInEx}
        >&#10095;
        </button>
      </div>

      <button
        onClick={handleClickNextEx}
      >Nxt exercise
      </button>

      <div>
        <Link to="/words-go-in">back</Link>
      </div>

      < AnswerTrackerFTGP />
    </div>
  )
}

//each exercise has sentence and answerSet (arr of arrs for each prep in sentence)
const mapStateToProps = (state) => {
  return {
    exercises: state.fillGapsPrepReducer.exercisesFGP
  }
};

const mapDispatchToProps = (dispatch) => ({
  updateCorrectAnswer: (ind1, ind2) => dispatch(updateCorrectAnswer(ind1, ind2))
});

export default connect(mapStateToProps, mapDispatchToProps)(FillTheGapsPrep);