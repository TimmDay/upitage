import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AnswerTrackerFTGP from './AnswerTrackerFTGP';
import { updateCorrectAnswer } from '../actions/fillGapsPrep'
import { GAP_BLANK } from '../resources/constants';
import { messages } from '../resources/messagesUI';



const FillTheGapsPrep = (props) => {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [indexGapFocus, setIndexGapFocus] = useState(0);

  useEffect(() => highlightFocusedGap());

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

  const handleClickAnswer = (evt, answer) => {
    if (answer.correct) {
      // render the correct word in the sentence gap
      document.getElementsByClassName('ftgp__sentence-word')[answer.indexInSentence].textContent = ` ${answer.word} `
      // user is done here, move focus to next gap
      handleClickNextGapBtn() 
      // inform redux of correct answer (so answer track visualisation can update)
      props.updateCorrectAnswer(exerciseIndex, indexGapFocus)
    } else {
      // style the incorrectly clicked btn
      evt.target.className = 'ftgp__answer-btn ftgp__btn-incorrect'
    }
  }
  
  let trackGapIndexOnEl = -1;
  
  //TODO: data gather -> print sentence with gaps to the console
  let sentence = ''
  props.exercises[exerciseIndex].sentence.forEach((word) => {
    sentence += ` ${word}`
  })
  console.log(sentence)

  props.exercises[exerciseIndex].answerSet.forEach((set, i) => {
    let choices = ''
    let answers = ''
    set.forEach(item => {
      choices += `${item.word}, `
      answers += `${item.correct}, `
    })
    console.log(choices)
    console.log(answers)
  })
  
  return (
    <div className='content-container'>
      {/* <p className='ftgp__title'>Fill The Gaps!</p> */}
      <div className='ftgp__sentence slide-in'>
      {
        props.exercises[exerciseIndex].sentence.map((w,i) => {
          let wordClasses = 'ftgp__sentence-word'
          
          if (w === GAP_BLANK) {
            wordClasses += ' ftgp__sentence-gap'
            trackGapIndexOnEl++
          }
          if (w === '-LRB-') w = '('
          if (w === '-RRB-') w = ')'

          return (
          <span
            key={`key${w}${i}`}
            className={wordClasses}
            data-gap-index = {(w === GAP_BLANK) ? trackGapIndexOnEl : -1}
            onClick={(w === GAP_BLANK) ? handleClickGap : null}
          >
            {(w === GAP_BLANK) ? ` ${w}` : /[.',)]/.test(w[0]) ? `${w}` : ` ${w}` }
            
          </span>
        )})
      }
      </div>

      <div className='ftgp__answer-set'>
        {
          props.exercises[exerciseIndex].answerSet[indexGapFocus].map((answer,i) => (
            <button
              key={`key${answer.word}${i}`}
              className='ftgp__answer-btn'
              onClick={(evt) => handleClickAnswer(evt, answer)}
              onMouseDown={(evt) => evt.preventDefault()}
            >{`${answer.word}`}</button>
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
      > {props.language && messages[props.language].nextExercise}
      </button>

      <div>
        <Link to="/words-go-in">{props.language && messages[props.language].back}</Link>
      </div>

      < AnswerTrackerFTGP />
    </div>
  )
}

const mapStateToProps = (state) => {
  return { 
    exercises: state.fillGapsPrepReducer.exercisesFGP,
    language: state.userOptions.langInstruction
  }
};

const mapDispatchToProps = (dispatch) => ({
  updateCorrectAnswer: (ind1, ind2) => dispatch(updateCorrectAnswer(ind1, ind2))
});

export default connect(mapStateToProps, mapDispatchToProps)(FillTheGapsPrep);