import { firebase, googleAuthProvider } from '../googleAPIs/firebase';

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const startLoginGoogle = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLoginDemo = () => {
  localStorage.setItem('demo','true'); 
  //to allow refresh of demo sessions
  //check local storage on refresh
  
  return dispatch => {
    dispatch(login('demo'));
  };
};
export const startLogout = () => {
  return (dispatch, getState) => {
    localStorage.clear(); //deal with any demo sessions
    const uid = getState().auth.uid;
    if (uid === 'demo') {
      dispatch(logout());
    } else {
      return firebase.auth().signOut();
    }
  };
};
