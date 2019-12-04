import React, { useState } from 'react';
import { connect } from 'react-redux';

// user can see which exercises have been answered correctly (green circle)
// or not answered (grey circle)

// [x] small bar with a circle for each ex
// [] when exercise correctly answered, circle turns green (dispatch a bool to redux)
// [] clicking on a circle navigates the use to that exercise (dispatch same as next ex btn)

const AnswerTrackerFTGP = (props) => {
const [ x, setX ] = useState();
return (
  <div className="answer-tracker">
    { props.exercises.map((ex, i) => (
        <div 
          className="answer-tracker__c"
          key={`anstrackFTGP${i}`}
        >{i + 1}</div>
      ))
    }
  </div>
);
}
const mapStateToProps = (state) => {
  return {
    exercises: state.fillGapsPrepReducer.exercisesFGP
  }
}

export default connect(mapStateToProps)(AnswerTrackerFTGP);