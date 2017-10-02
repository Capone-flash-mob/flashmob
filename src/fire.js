import firebase from 'firebase'

// Firebase API keys and related
var config = {
    apiKey: "AIzaSyC_aF7fUAhQ6EODOBH-JrrFMy6cTEoe8N8",
    authDomain: "capone-ff07e.firebaseapp.com",
    databaseURL: "https://capone-ff07e.firebaseio.com",
    projectId: "capone-ff07e",
    storageBucket: "capone-ff07e.appspot.com",
    messagingSenderId: "873484662570"
};

// Initialize the app & export
var fire = firebase.initializeApp(config);
export default fire;
