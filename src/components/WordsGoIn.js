import React, { useState } from 'react';
import { connect } from 'react-redux';
import LoadingPage from './LoadingPage'
import TextInput from './TextInput'
import TextEnhanced from './TextEnhanced'
import TextHighlightBar from './TextHighlightBar'
import TextScrapeBar from './TextScrapeBar'
import ButtonClearInputText from './ButtonClearInputText'
// import clearInputText from '../actions/inputText'


const WordsGoIn = (props) => {
  const [showHighlightMenu, setShowHighlightMenu] = useState(false);

  return (
    <div className='words-go-in'>
      {props.isLoading && <LoadingPage />} 
      {/* < TextScrapeBar /> */}
      
      <ButtonClearInputText />
      <button 
        onClick={() => setShowHighlightMenu(!showHighlightMenu)}
      >
        show enhancement menu
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
        
        {showHighlightMenu && <TextHighlightBar />}

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

const mapDispatchToProps = (dispatch) => ({
  // clearInputText: () => dispatch(clearInputText())
});

export default connect(mapStateToProps, mapDispatchToProps)(WordsGoIn);
