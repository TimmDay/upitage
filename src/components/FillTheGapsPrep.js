import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';


class FillTheGapsPrep extends React.Component {
  constructor(props) {
      super(props);
      this.state = {}
  }

  componentWillMount() {
    let arrSentsWithPreps = []
    this.props.tagsBySent.forEach((sent,i) => {

      for (let j=0; j<sent.length; j++) {
        console.log(sent.length)
        if (sent.length > 33) break; // restrict sentence length for exercise
        
        if (sent[j][0] == 'I' || sent[j][0] == 'T') { //check for preposition tag
          arrSentsWithPreps.push(i)
          break;
        }
      }
    })
    console.log(arrSentsWithPreps)

    this.setState({ 
      sentsWithPrep: arrSentsWithPreps,
      currentSent: 0
    })
    
    //[0, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
    
  }

  render () {
    return (
      <div>
        <p>fill the gaps exercise</p>
        <Link to="/words-go-in">back</Link>

        {/* {this.props.tagsBySent && 
        this.props.wordsBySent[sentsWithPrep[this.state.currentSent]].map((sent,i) => (
          <p></p>
        ))
        } */}
      </div>
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