import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import LoadingPage from './LoadingPage'
import TextInput from './TextInput'
import TextEnhanced from './TextEnhanced'
import TextHighlightBar from './TextHighlightBar'
import ButtonClearInputText from './ButtonClearInputText'


const WordsGoIn = (props) => {
  const [showHighlightMenu, setShowHighlightMenu] = useState(true);

  return (
    <div className='words-go-in'>
      {props.isLoading && <LoadingPage />} 
      {/* < TextScrapeBar /> */}
      
      {props.arrWords.length !== 0 && <ButtonClearInputText />}

      <button 
        // className='button'
        onClick={() => setShowHighlightMenu(!showHighlightMenu)}
      >
        {showHighlightMenu ? 'hide ' : 'show'} enhancement menu
      </button>

      <section>
        {
          props.arrWords.length === 0 ? (
            < TextInput />
          ) : (
            < TextEnhanced />
          )
        }
        {/* <button onClick={()=>setShowHighlightMenu(!showHighlightMenu)}></button> */}
        
        {showHighlightMenu &&
          <CSSTransition
            // key={'f'}
            in={true}
            appear={true}
            timeout={3000}
            classNames="slide-rl"
          >
            <TextHighlightBar />
          </CSSTransition>
        }
        {/* {showHighlightMenu && <TextHighlightBar />} */}

      </section>
    </div>
  )
}

const mapStateToProps = (state) => {
   return {
       arrWords: state.inputTextData.words,
       isLoading: state.inputTextData.isLoading
   }
};

export default connect(mapStateToProps)(WordsGoIn);
