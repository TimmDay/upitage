import React from 'react';
import { connect } from 'react-redux';
import { storeInputText, clearInputText, startPosProcessing } from '../actions/inputText'
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
    const obj = { text: this.state.textBody }
    const result = await this.props.startPosProcessing(obj)
    console.log(result)
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
        // className='button'
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
  startPosProcessing: (src) => dispatch(startPosProcessing(src))
});

export default connect(mapStateToProps, mapDispatchToProps)(TextInput);