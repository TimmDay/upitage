import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { startLogout } from '../actions/auth';

// logo
// app name
// menu - about
// menu - input
// menu learn
// icon(s) for lang spoken and target
// log in / logout

export const Header = ({ startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/main">
          <h1>
            {/* <FontAwesomeIcon icon="tv" /> */}
            &nbsp;&nbsp;Langevant&nbsp;&nbsp;
            {/* <FontAwesomeIcon icon="newspaper" /> */}
          </h1>
        </Link>
        <button className="button button--link" onClick={startLogout}>Logout</button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);