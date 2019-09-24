import React from 'react';
import { connect } from 'react-redux';


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
        isHighlightPrep: false
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
    let applyStyle = 'background:orange;'

    if (this.state.isHighlightAdj === true) { applyStyle = 'background: none' }
    
    let adjIndices = [] //store indices
    this.props.tags.forEach((tag, i) => {
      if (tag[0] == 'J') adjIndices.push(i)
    })
    const wordsArr = document.getElementsByClassName('wgi__raw-text');
    adjIndices.forEach(match => wordsArr[match].style = `${applyStyle}`)
 
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

  render () {
    return (
      <div className="text-highlight-bar">
        <button 
          disabled={!this.props.tags.length}
          onClick={this.handleHighlightVerbs}
        >verbs
        </button>

        <button
          // style = 'color:red'
          disabled={!this.props.tags.length}
          onClick={this.handleHighlightNouns}
        >nouns
        </button>

        <button 
          disabled={!this.props.tags.length}
          onClick={this.handleHighlightAdjectives}
        >adjectives
        </button>

        <button 
          disabled={!this.props.tags.length}
          onClick={this.handleHighlightPrepositions}
        >prepositions
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
   return {
       tags: state.inputTextData.tags
   }
};

export default connect(mapStateToProps)(TextHighlightBar);