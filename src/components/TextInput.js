import React from 'react';
import { connect } from 'react-redux';
import { startPosProcessing, startFleschKincaid } from '../actions/inputText'


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
    // only if english text
    this.props.startFleschKincaid(this.state.textBody)
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
  startPosProcessing: (src) => dispatch(startPosProcessing(src)),
  startFleschKincaid: (str) => dispatch(startFleschKincaid(str))
});

export default connect(mapStateToProps, mapDispatchToProps)(TextInput);