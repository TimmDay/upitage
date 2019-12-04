import React from 'react';
import { connect } from 'react-redux';
 
const TextEnhanced = (props) => {
    /*
  handleHoverWordForTranslation = (evt) => {
    const word = evt.target.innerText;
    console.log('WORD ROM COMP: ', word)
    fetch('http://localhost:3000/translated-text?word=' + word, { mode: 'no-cors' })
    .then(res => {
      res.json()
      .then(data => {
        console.log(data);
      })
    })
  }
  */
  return (
    <div className='text-enhanced'>
      <p>
        {props.arrWords.map((w,i) => (
          <span
            className='wgi__raw-text'
            // onMouseEnter={this.handleHoverWord}
            // onMouseLeave={this.handleHoverWordLeave}
            key={`key${w}${i}`}
            // leading space if normal char, no space if punctuation ('end.' not 'end .')
          >
            {/[.',]/.test(w[0]) ? `${w}` : ` ${w}`}
          </span>
        ))}
      </p>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
      arrWords: state.inputTextData.words,
      isLoading: state.inputTextData.isLoading
  }
};

export default connect(mapStateToProps)(TextEnhanced);;