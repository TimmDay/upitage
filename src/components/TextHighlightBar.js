import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { history } from '../routers/AppRouter';
import { messages } from '../resources/messagesUI';


const TextHighlightBar = (props) => {
  const [isHighlightVerb, setIsHighlightVerb] = useState(false);
  const [isHighlightNoun, setIsHighlightNoun] = useState(false);
  const [isHighlightAdj, setIsHighlightAdj] = useState(false);
  const [isHighlightPrep, setIsHighlightPrep] = useState(false);
  const [isHighlightAdv, setIsHighlightAdv] = useState(false);
  const [isHighlightDet, setIsHighlightDet] = useState(false);
  const [isHighlightW, setIsHighlightW] = useState(false);

  const handleHighlightVerbs = () => {
    let applyClass = 'text-highlight-verb'
    if (isHighlightVerb) { applyClass = '' }
    let verbIndices = [] //store indices
    props.tags.forEach((tag, i) => {
      if (tag[0] == 'V') verbIndices.push(i)
    })
    const wordsArr = document.getElementsByClassName('wgi__raw-text');
    verbIndices.forEach(match => wordsArr[match].className = `wgi__raw-text ${applyClass}`)
    setIsHighlightVerb(!isHighlightVerb)
  }

  const handleHighlightNouns = () => {
    let applyClass = 'text-highlight-noun'
    if (isHighlightNoun) { applyClass = '' }
    let nounIndices = [] //store indices
    props.tags.forEach((tag, i) => {
      if (tag[0] == 'N') nounIndices.push(i)
    })
    const wordsArr = document.getElementsByClassName('wgi__raw-text');
    nounIndices.forEach(match => wordsArr[match].className = `wgi__raw-text ${applyClass}`)
    setIsHighlightNoun(!isHighlightNoun)
  }

  const handleHighlightAdjectives = () => {
    let applyClass = 'text-highlight-adjective'
    if (isHighlightAdj) { applyClass = '' }
    let adjIndices = [] //store indices
    props.tags.forEach((tag, i) => {
      if (tag[0] == 'J') adjIndices.push(i)
    })
    const wordsArr = document.getElementsByClassName('wgi__raw-text');
    adjIndices.forEach(match => wordsArr[match].className = `wgi__raw-text ${applyClass}`)
    setIsHighlightAdj(!isHighlightAdj)
  }

  const handleHighlightPrepositions = () => {
    let applyClass = 'text-highlight-preposition'
    if (isHighlightPrep) { applyClass = '' }
    let prepIndices = [] //store indices
    props.tags.forEach((tag, i) => {
      if (tag[0] == 'I' || tag[0] == 'T') prepIndices.push(i)
    })
    const wordsArr = document.getElementsByClassName('wgi__raw-text');
    prepIndices.forEach(match => wordsArr[match].className = `wgi__raw-text ${applyClass}`)
    setIsHighlightPrep(!isHighlightPrep)
  }

  const handleHighlightAdv = () => {
    let applyClass = 'text-highlight-adv'
    if (isHighlightAdv) { applyClass = '' }
    let advIndices = [] //store indices
    props.tags.forEach((tag, i) => {
      if (tag[0] == 'R') advIndices.push(i)
    })
    const wordsArr = document.getElementsByClassName('wgi__raw-text');
    advIndices.forEach(match => wordsArr[match].className = `wgi__raw-text ${applyClass}`)
    setIsHighlightAdv(!isHighlightAdv)
   }

  const handleHighlightDet = () => {
    let applyClass = 'text-highlight-det'
    if (isHighlightDet) { applyClass = '' }
    let detIndices = [] //store indices
    props.tags.forEach((tag, i) => {
      if (tag[0] == 'D') detIndices.push(i)
    })
    const wordsArr = document.getElementsByClassName('wgi__raw-text');
    detIndices.forEach(match => wordsArr[match].className = `wgi__raw-text ${applyClass}`)
    setIsHighlightDet(!isHighlightDet)
   }

  const handleHighlightW = () => {
    let applyClass = 'text-highlight-w'
    if (isHighlightW) { applyClass = '' }
    let wIndices = [] //store indices
    props.tags.forEach((tag, i) => {
      if (tag[0] == 'W') wIndices.push(i)
    })
    const wordsArr = document.getElementsByClassName('wgi__raw-text');
    wIndices.forEach(match => wordsArr[match].className = `wgi__raw-text ${applyClass}`)
    setIsHighlightW(!isHighlightW)
  }


  return (
    <div className="text-highlight-bar">

      <div className="text-highlight__row">
        <button 
          className='btn-verb'
          disabled={!props.tags.length}
          onClick={handleHighlightVerbs}
          title={props.language && messages[props.language].verb}
        >V
        </button>

        <button
          disabled={!props.tags.length}
          onClick={handleHighlightNouns}
          title={props.language && messages[props.language].noun}
        >N
        </button>
      </div>

      <div className="text-highlight__row">
        <button 
          disabled={!props.tags.length}
          onClick={handleHighlightAdjectives}
          title={props.language && messages[props.language].adjective}
        >ADJ
        </button>

        <button 
          disabled={!props.tags.length}
          onClick={handleHighlightPrepositions}
          title={props.language && messages[props.language].preposition}
        >P
        </button>

        <button 
          disabled={!props.tags.length}
          onClick={handleHighlightAdv}
          title={props.language && messages[props.language].adverb}
        >ADV
        </button>
      </div>

      <div className="text-highlight__row">
        <button 
          disabled={!props.tags.length}
          onClick={handleHighlightDet}
          title={props.language && messages[props.language].determiner}
        >D
        </button>

        <button 
          disabled={!props.tags.length}
          onClick={handleHighlightW}
          title={props.language && messages[props.language].wWord}
        >W
        </button>

      </div>

      { props.languageLearn === 'EN' && (
        <div>
          {props.fleschKincaidGradeLevel && <p>Reading Grade: {props.fleschKincaidGradeLevel}</p>}
          {props.fleschReadingEase && <p>Reading Ease: {props.fleschReadingEase}</p>}
        </div>
      )}

      <button 
        disabled={props.emptyFTGPrepEx}
        onClick={() => history.push('/fill-gaps-p')}
      >
        {props.language && messages[props.language].prepositionTraining}
      </button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    language: state.userOptions.langInstruction,
    languageLearn: state.userOptions.langTarget,
    emptyFTGPrepEx: state.fillGapsPrepReducer.exercisesFGP.length === 0,
    tags: state.inputTextData.tags,
    fleschReadingEase: state.inputTextData.fleschReadingEase,
    fleschKincaidGradeLevel: state.inputTextData.fleschKincaidGradeLevel > 13 ? 'University' : state.inputTextData.fleschKincaidGradeLevel
  }
};

export default connect(mapStateToProps)(TextHighlightBar);