import React from 'react';
import { connect } from 'react-redux';
import { startClearInputText } from '../actions/inputText'
import { messages } from '../resources/messagesUI'

const ButtonClearInputText = (props) => (
  <button
    className={`btn-clearInputText ${props.className}`}
    onClick={props.startClearInputText}
  >
    {props.language ? messages[props.language].clearText : ''}
  </button>
);

const mapStateToProps = (state) => {
  return { language: state.userOptions.langInstruction }
};

const mapDispatchToProps = (dispatch) => ({
  startClearInputText: () => dispatch(startClearInputText())
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonClearInputText);