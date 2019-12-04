import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// user can see which exercises have been answered correctly (green circle)
// or not answered (grey circle)

// [x] small bar with a circle for each ex
// [] when at least 1 gap in ex corretly answered, circle turns yellow
// [] when every gap in excorrectly answered, circle turns green (dispatch a bool to redux)
// [] clicking on a circle navigates the use to that exercise (dispatch same as next ex btn)


const AnswerTrackerFTGP = (props) => {
const [ className, setClassName ] = useState();

console.log(props.exercises)

// useEffect(checkAns(this.props.exercises))
// useEffect(() => {
//   console.log('exercises changed')
//   checkAns(exercises)
// }, [exercises]); 

const checkAns = (ex,i) => {
  console.log(ex)
  
  console.log(ex.trackUserAnswers.every(el => el === 0))
  console.log(ex.trackUserAnswers.some(el => el === 1))
  console.log(ex.trackUserAnswers.every(el => el === 1))
  // "answer-tracker__c--none"
  if (ex.trackUserAnswers.every(el => el === 0)) {
    return "answer-tracker__c--none"
  } else if (ex.trackUserAnswers.every(el => el === 1)) {
    return "answer-tracker__c--all"
  } else if (ex.trackUserAnswers.some(el => el === 1)) {
    return "answer-tracker__c--some"
  }
}

return (
  <div className="answer-tracker">
    { props.exercises.map((ex, i) => (
        <div 
          className={checkAns(ex)}
          key={`anstrackFTGP${i}`}
        >{i + 1}</div>
      ))
    }
  </div>
);
}
const mapStateToProps = (state) => {
  return {
    exercises: state.fillGapsPrepReducer.exercisesFGP,
    deepRerenderToggle: state.fillGapsPrepReducer.deepRerenderToggle //include so
  }
}

export default connect(mapStateToProps)(AnswerTrackerFTGP);