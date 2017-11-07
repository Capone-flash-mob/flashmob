Functions and components that
import firebase from 'firebase'

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

function printRef(){
  console.log("Firebase storage reference:");
  console.log(storage);
}
