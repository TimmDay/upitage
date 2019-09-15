import React from 'react';
import { connect } from 'react-redux';
import { storeInputText } from '../actions/inputText'
import sentenceSplitter from '../utils/sentence-segmenter'


class WordsGoIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textBody: ''
    }
  }

  handleChangeTextArea = (evt) => {
    this.setState({textBody: evt.target.value})
  }

  handleHighlightVerbs = () => {
    let verbIndices = [] //store indices
    this.state.arrTags.forEach((tag, i) => {
      if (tag[0] == 'V') verbIndices.push(i)
    })
    const wordsArr = document.getElementsByClassName('wgi__raw-text');
    verbIndices.forEach(match => wordsArr[match].style = 'background:red;')
  }

  handleHighlightNouns = () => {
    let nounIndices = [] //store indices
    this.state.arrTags.forEach((tag, i) => {
      if (tag[0] == 'N') nounIndices.push(i)
    })
    const wordsArr = document.getElementsByClassName('wgi__raw-text');
    nounIndices.forEach(match => wordsArr[match].style = 'background:green;')
  }

  // full text (use request body)
  handleSubmitSourceForPOS = async (evt) => {
    evt.preventDefault();
    await this.setState({source: this.state.textBody})
    const text = this.state.textBody;
    console.log(text)
    
    const sents = sentenceSplitter(text)

    let arrWords = [], arrTags = [];
    let arrWordsAndTags = []

    for (let sent = 0; sent<sents.length; sent++) {
      const res = await fetch('http://localhost:3000/postag-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
        body: JSON.stringify({text: sents[sent]})
      })
      const data = await res.json()
      data.tag.split(' ').forEach(wordAndTag => {
        arrWordsAndTags.push(wordAndTag)
        const bits = wordAndTag.split('_')
        arrWords.push(bits[0])
        arrTags.push(bits[1])
      })
    }

    await this.setState({ 
      taggedText: arrWordsAndTags,
      arrWords: arrWords,
      arrTags: arrTags
    })
    // TODO: also to redux store
    const obj = {
      tagsAndWords: arrWordsAndTags,
      words: arrWords,
      tags: arrTags,
      sentences: sents
    }
    console.log(obj)
    
    this.props.storeInputText(obj)

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
      <div>
        <h1>Drop some Relevant Language here</h1>
        <form id='source-text' onSubmit={this.handleSubmitSourceForPOS}>
          <textarea 
            className='source-area'
            value={this.state.textBody}
            onChange={this.handleChangeTextArea}
          />
          <button>submit text</button>
        </form>

        {/* TODO: map a span for each word in here. can then target spans by index, matching POS to textBody for highlighting */}
        {
          !this.state.arrWords ? (
            <p>no source text</p>
          ) : (
            <div>
            <p>
            {this.state.arrWords.map((w,i) => (
              <span
                className='wgi__raw-text'
                // onMouseEnter={this.handleHoverWord}
                // onMouseLeave={this.handleHoverWordLeave}
                key={`key${w}${i}`}
              >{` ${w}`}</span>
            ))}
            </p>
            </div>
          )
        }

      <button 
        disabled={!this.state.taggedText}
        onClick={this.handleHighlightVerbs}
      >select verbs
      </button>

      <button 
        disabled={!this.state.taggedText}
        onClick={this.handleHighlightNouns}
      >select nouns
      </button>


        {/* TODO: make a component that takes the text as a prop */}
    </div>
    )
  }
}


const mapStateToProps = (state) => {
   return {
       
   }
};

const mapDispatchToProps = (dispatch) => ({
  storeInputText: obj => dispatch(storeInputText(obj)),
   
});

export default connect(mapStateToProps, mapDispatchToProps)(WordsGoIn);
