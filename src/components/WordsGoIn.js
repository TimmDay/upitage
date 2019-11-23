import React from 'react';
import { connect } from 'react-redux';

import TextHighlightBar from './TextHighlightBar'
import TextScrapeBar from './TextScrapeBar'
import LoadingPage from './LoadingPage'
import TextInput from './TextInput'



class WordsGoIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        {this.props.isLoading && <LoadingPage />} 

        < TextScrapeBar />

        <section>
          {
            this.props.arrWords.length === 0 ? (
              < TextInput />
            ) : (
              <div className='display-text'>

                {/* < TextInput /> */}

                <p>
                  {this.props.arrWords.map((w,i) => (
                    <span
                      className='wgi__raw-text'
                      // onMouseEnter={this.handleHoverWord}
                      // onMouseLeave={this.handleHoverWordLeave}
                      key={`key${w}${i}`}
                      // leading space if normal char, no space if punctuation
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
       arrWords: state.inputTextData.words,
       isLoading: state.inputTextData.isLoading
   }
};

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(WordsGoIn);
