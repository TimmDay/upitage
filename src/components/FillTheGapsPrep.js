import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AnswerTrackerFTGP from './AnswerTrackerFTGP';
import { updateCorrectAnswer } from '../actions/fillGapsPrep'


const FillTheGapsPrep = (props) => {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [indexGapFocus, setIndexGapFocus] = useState(0);

  useEffect(() => highlightFocusedGap());

  const GAP_BLANK = '___'

  /**
   * handleClickNextEx
   * increments exerciseIndex, or cycles it back to the start
   * clears any text content (answers) from last exercise
   */
  const handleClickNextEx = () => {
    const maxExerciseIndex = props.exercises.length -1 
    repopulateGaps() // wipe any visible answers from last ex
    if (exerciseIndex < maxExerciseIndex) {
      setIndexGapFocus(0)
      setExerciseIndex(exerciseIndex + 1)
    } else {
      setIndexGapFocus(0)
      setExerciseIndex(0)
    }
  }

  /**
   * handleClickNextGapBtn
   * increments indexGapFocus, or cycles it back to the start 
   */
  const handleClickNextGapBtn = async () => {
    const maxAnswerSetIndex = props.exercises[exerciseIndex].answerSet.length-1;
    if (indexGapFocus < maxAnswerSetIndex) setIndexGapFocus(indexGapFocus + 1);
    else setIndexGapFocus(0);
  }

  /**
   * repopulateGaps
   * ensure that all ftgp__sentence-gap elements display the blank
   */
  const repopulateGaps = () => {
    const gaps = document.getElementsByClassName('ftgp__sentence-gap')
    for (let i=0; i<gaps.length; i++) gaps[i].textContent = GAP_BLANK;
  }

  /**
   * highlightFocusedGap
   * adds styles to the current indexGapFocus to show user where focus is
   */
  const highlightFocusedGap = () => {
    const gaps = document.getElementsByClassName('ftgp__sentence-gap')
    const gapsClasses = 'ftgp__sentence-word ftgp__sentence-gap'

    for (let i=0; i<gaps.length; i++) {
      gaps[i].className = gapsClasses
      if (i === indexGapFocus) gaps[i].className += ' ftgp__sentence-gap--focus'
    }
  }

  /**
   * handleClickGap
   * sets the focus to the gap index of the spanGap that was clicked
   * @param {*} evt object for click event
   */
  const handleClickGap = (evt) => {
    setIndexGapFocus(parseInt(evt.target.dataset.gapIndex))
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
        handleClickNextGapBtn()
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
  let track = -1;
  return (
    <div className='content-container'>
      {/* <p className='ftgp__title'>Fill The Gaps!</p> */}
      <div className='ftgp__sentence slide-in'>
      {
        props.exercises[exerciseIndex].sentence.map((w,i) => {
          let wordClasses = 'ftgp__sentence-word'
          
          if (w === GAP_BLANK) wordClasses += ' ftgp__sentence-gap'
          if (w === '-LRB-') w = '('
          if (w === '-RRB-') w = ')'

          
          if (w === GAP_BLANK) track++

          return (
          <span
            key={`key${w}${i}`}
            className={wordClasses}
            data-gap-index = {(w === GAP_BLANK) ? track : -1}
            onClick={(w === GAP_BLANK) ? handleClickGap : null}
          >
            {/[.',)]/.test(w[0]) ? `${w}` : ` ${w}`}
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
          onClick={handleClickNextGapBtn}
        >&#10095;
        </button>
      </div>

      <button
        onClick={handleClickNextEx}
      > Next Exercise
      </button>

      <div>
        <Link to="/words-go-in">back</Link>
      </div>

      < AnswerTrackerFTGP />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    exercises: state.fillGapsPrepReducer.exercisesFGP
  }
};

const mapDispatchToProps = (dispatch) => ({
  updateCorrectAnswer: (ind1, ind2) => dispatch(updateCorrectAnswer(ind1, ind2))
});

export default connect(mapStateToProps, mapDispatchToProps)(FillTheGapsPrep);