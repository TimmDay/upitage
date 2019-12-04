import React from 'react';
import { connect } from 'react-redux';
import { history } from '../routers/AppRouter';
// import { navigateToFGP } from '../actions/fillGapsPrep'


class TextHighlightBar extends React.Component {
  constructor(props) {
      super(props);
      this.state = {}
  }

  //clear local state if user submits new text (global state), so that highlighting works properly on one click
  componentDidUpdate(prevProps) {
    if (this.props.tags !== prevProps.tags) {
      this.setState(() => ({
        isHighlightVerb: false,
        isHighlightNoun: false,
        isHighlightAdj: false,
        isHighlightPrep: false,
        isHighlightAdv: false,
        isHighlightDet: false,
        isHighlightW: false
      }))
    }
  }

  handleHighlightVerbs = () => {
    let applyClass = 'text-highlight-verb'

    if (this.state.isHighlightVerb === true) { applyClass = '' }

    let verbIndices = [] //store indices
    this.props.tags.forEach((tag, i) => {
      if (tag[0] == 'V') verbIndices.push(i)
    })
    const wordsArr = document.getElementsByClassName('wgi__raw-text');
    verbIndices.forEach(match => wordsArr[match].className = `wgi__raw-text ${applyClass}`)
 
    this.setState((prevState) => ({ isHighlightVerb: !prevState.isHighlightVerb }))
  }

  handleHighlightNouns = () => {
    let applyClass = 'text-highlight-noun'

    if (this.state.isHighlightNoun === true) { applyClass = '' }
    
    let nounIndices = [] //store indices
    this.props.tags.forEach((tag, i) => {
      if (tag[0] == 'N') nounIndices.push(i)
    })
    const wordsArr = document.getElementsByClassName('wgi__raw-text');
    nounIndices.forEach(match => wordsArr[match].className = `wgi__raw-text ${applyClass}`)
 
    this.setState((prevState) => ({ isHighlightNoun: !prevState.isHighlightNoun }))
  }

  handleHighlightAdjectives = () => {
    // let applyStyle = 'background:orange;'
    let applyClass = 'text-highlight-adjective'

    if (this.state.isHighlightAdj === true) { applyClass = '' }
    
    let adjIndices = [] //store indices
    this.props.tags.forEach((tag, i) => {
      if (tag[0] == 'J') adjIndices.push(i)
    })
    const wordsArr = document.getElementsByClassName('wgi__raw-text');
    adjIndices.forEach(match => wordsArr[match].className = `wgi__raw-text ${applyClass}`)
 
    this.setState((prevState) => ({ isHighlightAdj: !prevState.isHighlightAdj }))
  }

  handleHighlightPrepositions = () => {
    let applyClass = 'text-highlight-preposition'

    if (this.state.isHighlightPrep === true) { applyClass = '' }
    
    let prepIndices = [] //store indices
    this.props.tags.forEach((tag, i) => {
      if (tag[0] == 'I' || tag[0] == 'T') prepIndices.push(i)
    })
    const wordsArr = document.getElementsByClassName('wgi__raw-text');
    prepIndices.forEach(match => wordsArr[match].className = `wgi__raw-text ${applyClass}`)
 
    this.setState((prevState) => ({ isHighlightPrep: !prevState.isHighlightPrep }))
  }

  handleHighlightAdv = () => {
    let applyClass = 'text-highlight-adv'

    if (this.state.isHighlightAdv === true) { applyClass = '' }

    let advIndices = [] //store indices
    this.props.tags.forEach((tag, i) => {
      if (tag[0] == 'R') advIndices.push(i)
    })
    const wordsArr = document.getElementsByClassName('wgi__raw-text');
    advIndices.forEach(match => wordsArr[match].className = `wgi__raw-text ${applyClass}`)
 
    this.setState((prevState) => ({ isHighlightAdv: !prevState.isHighlightAdv }))
  }

  handleHighlightDet = () => {
    let applyClass = 'text-highlight-det'

    if (this.state.isHighlightDet === true) { applyClass = '' }

    let detIndices = [] //store indices
    this.props.tags.forEach((tag, i) => {
      if (tag[0] == 'D') detIndices.push(i)
    })
    const wordsArr = document.getElementsByClassName('wgi__raw-text');
    detIndices.forEach(match => wordsArr[match].className = `wgi__raw-text ${applyClass}`)
 
    this.setState((prevState) => ({ isHighlightDet: !prevState.isHighlightDet }))
  }

  handleHighlightW = () => {
    let applyClass = 'text-highlight-w'

    if (this.state.isHighlightW === true) { applyClass = '' }

    let wIndices = [] //store indices
    this.props.tags.forEach((tag, i) => {
      if (tag[0] == 'W') wIndices.push(i)
    })
    const wordsArr = document.getElementsByClassName('wgi__raw-text');
    wIndices.forEach(match => wordsArr[match].className = `wgi__raw-text ${applyClass}`)
 
    this.setState((prevState) => ({ isHighlightW: !prevState.isHighlightW }))
  }


  render () {
    return (
      <div className="text-highlight-bar">

        <div className="text-highlight__row">
          <button 
            className='btn-verb'
            disabled={!this.props.tags.length}
            onClick={this.handleHighlightVerbs}
          >V
          </button>

          <button
            disabled={!this.props.tags.length}
            onClick={this.handleHighlightNouns}
          >N
          </button>
        </div>

        <div className="text-highlight__row">
          <button 
            disabled={!this.props.tags.length}
            onClick={this.handleHighlightAdjectives}
          >ADJ
          </button>

          <button 
            disabled={!this.props.tags.length}
            onClick={this.handleHighlightPrepositions}
          >P
          </button>

          <button 
            disabled={!this.props.tags.length}
            onClick={this.handleHighlightAdv}
          >ADV
          </button>
        </div>

        <div className="text-highlight__row">
          <button 
            disabled={!this.props.tags.length}
            onClick={this.handleHighlightDet}
          >D
          </button>

          <button 
            disabled={!this.props.tags.length}
            onClick={this.handleHighlightW}
          >W
          </button>

        </div>

        <div>
          {this.props.fleschKincaidGradeLevel && <p>Reading Grade: {this.props.fleschKincaidGradeLevel}</p>}
          {this.props.fleschReadingEase && <p>Reading Ease: {this.props.fleschReadingEase}</p>}
        </div>

        <button 
          disabled={this.props.emptyFTGPrepEx}
          onClick={() => history.push('/fill-gaps-p')}
        >
          Preposition Training
        </button>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
   return {
       emptyFTGPrepEx: state.fillGapsPrepReducer.exercisesFGP.length === 0,
       tags: state.inputTextData.tags,
       fleschReadingEase: state.inputTextData.fleschReadingEase,
       fleschKincaidGradeLevel: state.inputTextData.fleschKincaidGradeLevel > 13 ? 'University' : state.inputTextData.fleschKincaidGradeLevel
   }
};

// const mapDispatchToProps = (dispatch) => ({
//   navigateToFGP: () => dispatch(navigateToFGP())
// });

export default connect(mapStateToProps)(TextHighlightBar);