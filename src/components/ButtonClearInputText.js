import React from 'react';
import { connect } from 'react-redux';
import { startClearInputText } from '../actions/inputText'


const ButtonClearInputText = (props) => (
  <button
    className='btn-clearInputText'
    onClick={props.startClearInputText}
  >
    enter new text
  </button>
);

const mapDispatchToProps = (dispatch) => ({
  startClearInputText: () => dispatch(startClearInputText())
});

export default connect(undefined, mapDispatchToProps)(ButtonClearInputText);