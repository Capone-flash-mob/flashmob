import database from './database'
import firebase from 'firebase';
import fire from './fire';

var users = {};
// Checks if flashmob uid is listed under a user's uids
// Returns false for instructors
users.userIsParticipantOfMob = function (user_uid, flashmob_uid){
  var userRef = firebase.database().ref('/users/' + user_uid + '/MyMobs/' + flashmob_uid);
  userRef.once('value').then(mob => {
    if(mob.val() == null){
      return false;
    }
    return true;
  });
}

users.addFlashMobToUser = function (flashmob_uid){
  if(firebase.auth().currentUser){
    var isInt = {
      'Interested': true,
      'Admin': false,
    }
    var userid = firebase.auth().currentUser.uid;
    var userRef = firebase.database().ref('/users/' + userid + '/MyMobs/' + flashmob_uid);
    userRef.update(isInt);
  }
}

export default users;
