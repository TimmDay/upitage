import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { startLogout } from '../actions/auth';
import { mapLangToImage } from '../utils/mapLang';
import { messages } from '../resources/messagesUI';


// logo
// app name
// menu - about
// menu - input
// menu learn
// icon(s) for lang spoken and target
// log in / logout

export const Header = (props) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/main">
          <h1>
            {/* <FontAwesomeIcon icon="tv" /> */}
            Langevant
            {/* <FontAwesomeIcon icon="newspaper" /> */}
          </h1>
        </Link>

        <div className='header__right'>
          <img
            className='header__spoken'
            src={mapLangToImage(props.spoken)} 
            // alt="display users spoken language"
          />
          <img 
            className='header__target'
            src={mapLangToImage(props.target)} 
            // alt="display users language to learn"
          />
          <button className="button button--link" onClick={props.startLogout}>
            {props.spoken && messages[props.spoken].logout}
          </button>
        </div>

      </div>
    </div>
  </header>
);

const mapStateToProps = (state) => {
  return {
    spoken: state.userOptions.langInstruction || '',
    target: state.userOptions.langTarget || ''
  }
};
const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);