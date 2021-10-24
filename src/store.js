import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/database";
import "firebase/auth";

import { firebaseReducer } from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore";
import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingReducers";
//Reducers
//@todos

const firebaseConfig = {
  apiKey: "AIzaSyBJbNdtiwvg2Cv_Z6tcE0eN1rGCE4C59wU",
  authDomain: "react-client-panel-29bbf.firebaseapp.com",
  projectId: "react-client-panel-29bbf",
  storageBucket: "react-client-panel-29bbf.appspot.com",
  messagingSenderId: "873675503274",
  appId: "1:873675503274:web:9079e0f91ddb155a9402d3",
  measurementId: "G-E6CD8W9EX5",
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,

  // Firestore for Profile instead of Realtime DB
};

//Init firebase instance
firebase.initializeApp(firebaseConfig);
firebase.firestore(); //needed if using firestore

//Add reactReduxFirebase enhancer when making store creator
/*const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), //firebase instance as argument
  reduxFiretore(firebase) // <- needed if using firestore
)(createStore);*/

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  notify: notifyReducer,
  settings: settingsReducer,
});

//Check for settings in localStorage
if (localStorage.getItem("settings") == null) {
  //Default Settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false,
  };

  //Set to localStorage
  localStorage.setItem("settings", JSON.stringify(defaultSettings));
}

//Create initial State
const initialState = {
  settings: JSON.parse(localStorage.getItem("settings")),
};

//Create store
/*const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);*/
const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

export default store;
