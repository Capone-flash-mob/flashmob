import database from './database'
import firebase from 'firebase';
import fire from './fire';

// Checks if flashmob uid is listed under a user's uids
// Returns false for instructors
function userIsParticipantOfMob(user_uid, flashmob_uid){
  
}

function addFlashMobToUser(flashmob_uid){
  if(firebase.auth().currentUser){
    var isInt = {
      'Interested': true,
      'Admin': false,
    }
    var userid = firebase.auth().currentUser.uid;
    var userRef = firebase.database().ref('/users/' + userid + '/MyMobs/' + mob);
    userRef.update(isInt);
  }
}
