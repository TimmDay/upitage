import React from 'react';
import { connect } from 'react-redux';
import { startLoginGoogle, startLoginDemo } from '../actions/auth';

export const LoginPage = ({ startLoginGoogle, startLoginDemo }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      
      <h1 className="box-layout__title">LingLangLearn</h1>
      <p>Language Learning in the Real World</p>
      <div className='login__btn-bar'>
        <button className="login__btn login_disabled" onClick={startLoginGoogle} disabled>Login with Google</button>
        <button className="login__btn" onClick={startLoginDemo}>Login DEMO</button>
      </div>
      <p>learn the language in the domain you will use it</p>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLoginGoogle: () => dispatch(startLoginGoogle()),
  startLoginDemo: () => dispatch(startLoginDemo('demo'))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
