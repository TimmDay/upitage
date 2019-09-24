import React from 'react';
import { connect } from 'react-redux';
import { storeInputText } from '../actions/inputText'

import TextHighlightBar from './TextHighlightBar'
import TextInput from './TextInput'
import TextScrapeBar from './TextScrapeBar'


class WordsGoIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textBody: ''
    }
  }


  // handleHoverWord = (evt) => {
  //   console.log(evt)
  //   console.log(evt.target)
  //   console.log(evt.target.innerText)

  //   const word = evt.target.innerText;
  //   console.log('WORD ROM COMP: ', word)

  //   fetch('http://localhost:3000/translated-text?word=' + word, { mode: 'no-cors' })
  //   .then(res => {
  //     res.json()
  //     .then(data => {
  //       console.log(data);
  //     })
  //   })
  // }

  render () {
    
    return (
      <div className='words-go-in'>

        < TextScrapeBar />

        <section>
          {/* TODO: map a span for each word in here. can then target spans by index, matching POS to textBody for highlighting */}
          {
            !this.props.arrWords ? (
              <p>no source text</p>
            ) : (
              <div className='display-text'>
                <p>
                  {this.props.arrWords.map((w,i) => (
                    <span
                      className='wgi__raw-text'
                      // onMouseEnter={this.handleHoverWord}
                      // onMouseLeave={this.handleHoverWordLeave}
                      key={`key${w}${i}`}
                      // TODO: leaing space if normal char, no space if punctuation
                      // w.test(//)
                    >{/[.',]/.test(w[0]) ? `${w}` : ` ${w}`}</span>
                  ))}
                </p>
              </div>
            )
          }
          <TextHighlightBar />
        </section>
        

    </div>
    )
  }
}


const mapStateToProps = (state) => {
   return {
       arrWords: state.inputTextData.words
   }
};

const mapDispatchToProps = (dispatch) => ({
  storeInputText: obj => dispatch(storeInputText(obj)),
   
});

export default connect(mapStateToProps, mapDispatchToProps)(WordsGoIn);
