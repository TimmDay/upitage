import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class FillTheGapsPrep extends React.Component {
  constructor(props) {
      super(props);
      this.state = {}
  }

  componentWillMount() {
    let arrSentsWithPreps = []

    // determine candidate sentences for exercise
    // build the exercise sentence (words)
    // store the correct answers, (i, j)

    let exercises = []
    let answers = [] //i,j

    // check if sentence has prep. if not skip
    //let hasPREP = false
    this.props.tagsBySent.forEach((sent,i) => {

      if (sent.length > 33) {
        // length restriciton: do nothing
      } else {
        let exercise = []
        for (let j=0; j<sent.length; j++) {
          if (sent[j][0] == 'I' || sent[j][0] == 'T') { //check for preposition tag
            arrSentsWithPreps.push(i)
            exercise.push('_____')
            answers.push(this.props.wordsBySent[i][j])
            // break;
          } else {
            exercise.push(this.props.wordsBySent[i][j])
          }
        }
        exercises.push(exercise)
      }
    })
    console.log(arrSentsWithPreps)

    this.setState({ 
      sentsWithPrep: arrSentsWithPreps,
      currentSent: 0,
      exercises: exercises
    })
    
    //[0, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
    
  }

  render () {
    return (
      <React.Fragment>
        <p>Which Preposition fits?</p>
        {
          this.state.exercises[0].map((w,i) => (
            <span
              key={`key${w}${i}`}
            >
              {`${w} `}
            </span>
          ))
        }

        <div>

        </div>

        <div>
          <Link to="/words-go-in">back</Link>
        </div>
      </React.Fragment>
    )
  }
}


const mapStateToProps = (state) => {
   return {
    tagsBySent: state.inputTextData.tagsBySent,
    wordsBySent: state.inputTextData.wordsBySent
   }
};

const mapDispatchToProps = (dispatch) => ({
   
});

export default connect(mapStateToProps, mapDispatchToProps)(FillTheGapsPrep);