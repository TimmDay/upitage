import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyD6NO9w6boTjJ_2H53q2ccztjCNanGyyYE',
  authDomain: 'tucker-tracker-1557165626362.firebaseapp.com',
  databaseURL: 'https://tucker-tracker-1557165626362.firebaseio.com',
  projectId: '1557165626362',
  storageBucket: 'tucker-tracker-1557165626362.appspot.com',
  messagingSenderId: '305504256293'
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export { 
  firebase, 
  googleAuthProvider, 
  database as default 
};
