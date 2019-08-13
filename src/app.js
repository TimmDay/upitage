import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import './fontawesome';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { firebase } from './googleAPIs/firebase';
import LoadingPage from './components/LoadingPage';

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

// user authentication state
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    renderApp();
    if (history.location.pathname === '/') {
      history.push('/new-user');
    }

  } else {
    // first check local storage for case of demo login
    const isDemo = localStorage.getItem('demo')
    console.log(isDemo);

    if (isDemo) {
      // update the redux store with demo user credentials
      // so that the demo can still access private routes
      // and remain on whatever page the demo user was on
      store.dispatch(login('demo'))
      renderApp();

    } else { //was not demo. execute firebase logout
      store.dispatch(logout());
      renderApp();
      history.push('/');
    }
  }
});
