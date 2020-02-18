import React from 'react';
import { connect } from 'react-redux';
import { startPosProcessing, startFleschKincaid } from '../actions/inputText'
import { messages } from '../resources/messagesUI';

class TextInput extends React.Component {
  constructor(props) {
      super(props);
      this.state = { textBody: '' }
  }

  handleChangeTextArea = (evt) => {
    this.setState({textBody: evt.target.value})
  }

  handleSubmitSourceForPOS = (evt) => {
    this.props.startPosProcessing({ text: this.state.textBody })
    // only if english text
    this.props.startFleschKincaid(this.state.textBody)
  }

  handleOnEnterPress = (evt) => {
    if (evt.keyCode == 13 && evt.shiftKey === false) {
      this.handleSubmitSourceForPOS()
    }
  }
  
  render () {
    return (
      <div className='text-input'>
        <form
          className='text-input__form'
          onSubmit={this.handleSubmitSourceForPOS}
        >
          <textarea 
            className='text-input__textarea'
            value={this.state.textBody}
            onChange={this.handleChangeTextArea}
            placeholder='Text hier einfügen'
            onKeyDown={this.handleOnEnterPress}
          />
        </form>

        <button 
          className='button'
          disabled={!this.state.textBody}
          onClick={this.handleSubmitSourceForPOS}  
        >
          {this.props.spoken && messages[this.props.spoken].submitText}
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    spoken: state.userOptions.langInstruction || '',
    target: state.userOptions.langTarget || ''
  }
};
const mapDispatchToProps = (dispatch) => ({
  startPosProcessing: (src) => dispatch(startPosProcessing(src)),
  startFleschKincaid: (str) => dispatch(startFleschKincaid(str))
});

export default connect(mapStateToProps, mapDispatchToProps)(TextInput);