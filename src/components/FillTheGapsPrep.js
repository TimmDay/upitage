import React from 'react';
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

class FillTheGapsPrep extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        exerciseIndex: 0,
        answerIndexFocus: 0
      }
  }

  handleClickNextEx = async () => {
    const numExercises = await this.props.exercises.length
    
    if (this.state.exerciseIndex < numExercises-1) {
      await this.setState(prevState => ({
        exerciseIndex: prevState.exerciseIndex + 1,
        answerIndexFocus: 0
      }))
    } else {
      await this.setState({
        exerciseIndex: 0,
        answerIndexFocus: 0
      })
    }
  }

  handleClickNextGapInEx = () => {
    const nextGapIndex = this.state.answerIndexFocus + 1
    const numAnswerSets = this.props.exercises[this.state.exerciseIndex].answerSet.length

    if (nextGapIndex < numAnswerSets) {
      this.setState(prevState => ({
        answerIndexFocus: prevState.answerIndexFocus + 1
      }))
      // remove highlight class from other elements
      // add highlight class to this element
    } else {
      this.setState(({
        answerIndexFocus: 0
      }))
    }
  }

  handleClickGap = (evt) => {
    console.log(evt.target)
    
    //get the index of the gap
    // just count it
      // get posn in html coll
      // count gaps before it
    // const coll = 
    // this.setState(prevState => ({ answerIndexFocus: }))

    // give the gap class highlighted,
    // remove class from other gaps
  }

  handleClickAnswer = (evt, a) => {
    
    if (a.correct) {
      console.log(a.indexInSentence)
      console.log(this.state.answerIndexFocus)
      console.log(this.props.exercises[this.state.exerciseIndex].answerSet.length-1)

      // if all answers for exercise are correct -> redux update

      // move focus to next gap (IFF there is another gap)
      // TODO: slide transition in the next answer set
      const lastGapIndex = this.props.exercises[this.state.exerciseIndex].answerSet.length-1
      if (this.state.answerIndexFocus < lastGapIndex) {
        this.handleClickNextGapInEx()
      } else {
        // TODO: if still unfilled gaps, go to the first remaining
        // add focus
        // if not unfilled gaps, some sort of congrats animation and head to next exercise
      }

      // render the correct word in the sentence gap
      document.getElementsByClassName('ftgp__sentence-word')[a.indexInSentence].textContent = ` ${a.word} `
      
      // [] update redux tracker for correct answer
      console.log('CLICKED ANSWER: ' + this.state.answerIndexFocus)
      // exIndex, ansIndex
      this.props.updateCorrectAnswer(this.state.exerciseIndex, this.state.answerIndexFocus)



      // can we change it in the data instead?
    } else {

      evt.target.className = 'ftgp__answer-btn ftgp__btn-incorrect'

    }
    

    // if all sentence gaps are full, move focus to the arrow for the next exercise
    
  }

  // TODO:
  // gaps get a special highlight, especially when active
  // filled in words get the preposition color
  render () {
    return (
      <div className='content-container'>
        {/* <p className='ftgp__title'>Fill The Gaps!</p> */}

        <div className='ftgp__sentence slide-in'>
        {
          this.props.exercises[this.state.exerciseIndex].sentence.map((w,i) => {
            let wordClasses = 'ftgp__sentence-word'
            // let clickFcn
            if (w === '___') { //TODO: gap may change. put it in a global constants file at some point
              console.log('gap here, add to className')
              wordClasses += ' ftgp__sentence-gap'
            }
            return (
            <span
              key={`key${w}${i}`}
              className={wordClasses}
              onClick={(w === '___') ? this.handleClickGap : ()=>console.log('gap click')} //TODO: ask if ok on SO
            >
              {/[.',]/.test(w[0]) ? `${w}` : ` ${w}`}
              {/* {`${w} `} */}
            </span>
          )})
        }
        </div>

        <div className='ftgp__answer-set'>
          {
            this.props.exercises[this.state.exerciseIndex].answerSet[this.state.answerIndexFocus].map((a,i) => (
              <button
                key={`key${a.word}${i}`}
                className='ftgp__answer-btn'
                onClick={(evt) => this.handleClickAnswer(evt, a)}
                onMouseDown={(evt) => evt.preventDefault()}
              >{`${a.word}`}</button>
            ))
          }
          <button
            className='ftgp__answer-btn'
            onClick={this.handleClickNextGapInEx}
          >&#10095;
          </button>
        </div>

        <button
          onClick={this.handleClickNextEx}
        >Nxt exercise
        </button>

        <div>
          <Link to="/words-go-in">back</Link>
        </div>

        < AnswerTrackerFTGP />
      </div>
    )
  }
}

//each exercise has sentence and answerSet (arr of arrs for each prep in sentence)
const mapStateToProps = (state) => {
  return {
    exercises: state.fillGapsPrepReducer.exercisesFGP
  }
};

const mapDispatchToProps = (dispatch) => ({
  updateCorrectAnswer: (obj) => dispatch(updateCorrectAnswer(obj))
});

export default connect(mapStateToProps, mapDispatchToProps)(FillTheGapsPrep);