import React from 'react';
import { connect } from 'react-redux';
import { storeInputText, clearInputText } from '../actions/inputText'
import sentenceSplitter from '../utils/sentence-segmenter'



class TextInput extends React.Component {
  constructor(props) {
      super(props);
      this.state = {}
  }

  handleChangeTextArea = (evt) => {
    this.setState({textBody: evt.target.value})
  }

  // full text (use request body)
  handleSubmitSourceForPOS = async (evt) => {
    evt.preventDefault();

    await this.props.clearInputText()

    await this.setState({source: this.state.textBody})
    let text = this.state.textBody;
    console.log(text)

    //remove whitespaces and newline chars
    text = text.replace(/(\r\n|\n|\r)/gm, "").trim(); 
    // console.log(text)

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

  render () {
    return (
      <React.Fragment>
      <form onSubmit={this.handleSubmitSourceForPOS}>
        <input 
          className='source-area text-input'
          value={this.state.textBody}
          onChange={this.handleChangeTextArea}
          placeholder='paste own text'
          onSubmit={this.handleSubmitSourceForPOS}
        />
      </form>
      <button 
        className='button'
        disabled={!this.state.textBody}
        onClick={this.handleSubmitSourceForPOS}  
      >submit text</button>
      </React.Fragment>
    )
  }
}


const mapStateToProps = (state) => {
   return {
       
   }
};

const mapDispatchToProps = (dispatch) => ({
  storeInputText: obj => dispatch(storeInputText(obj)),
  clearInputText: () => dispatch(clearInputText())
});

export default connect(mapStateToProps, mapDispatchToProps)(TextInput);