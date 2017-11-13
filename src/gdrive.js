/*
This file contains functions and components related to accessing google drive.
Components:
  - Authentication button
  - Video Upload button
  - File Displays
*/
import React, { Component } from 'react';
import gapi from './gapi'

var uploadURI = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable';
let apiToken = null;
var GoogleDriveComponents = {};

  // Print an authorized user's filenames and ids.
  GoogleDriveComponents.printFiles = function() {
    gapi.client.drive.files.list({
      'pageSize': 10,
      'fields': "nextPageToken, files(id, name)"
    }).then(function(response) {
      var files = response.result.files;
      if (files && files.length > 0) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          console.log("Files:" + file.name + ' ID:' + file.id + ')');
        }
      } else {
        console.log('No files found.');
      }
    });
  }

// Allows a user to grant us access to their google drive
GoogleDriveComponents.GoogleLogin = class GoogleLogin extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showAuth: "block",
      showSignout: "none"
    };
  }

  // Initializes the Google Drive library and sets up sign-in statelisteners.
  initClient() {
    var self = this;
    var creds = {};

    // Client ID and API key from the Developer Console
    creds["apiKey"] = 'AIzaSyAWsOMuD2IvgMa_DtqEKJKmmG279bWOBpc';
    creds["clientId"] = '873484662570-llocoft6cvqr4rksup2j4a27cbu49df4.apps.googleusercontent.com';

    // Array of API discovery doc URLs for APIs used by the quickstart
    creds["discoveryDocs"] = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    creds["scope"] = 'https://www.googleapis.com/auth/drive.metadata.readonly';

    gapi.client.init(creds).then(function () {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(self.updateSigninStatus.bind(self));

      // Handle the initial sign-in state.
      self.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }

  // Loads the auth2 library and API client library.
  handleClientLoad() {
   gapi.load('client:auth2', this.initClient.bind(this));
  }

  // Updates UI when sign in status changes. After a sign-in, the API is called.
  updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      this.setState({
        showAuth:'none',
        showSignout:'block'
      });
    }
    else {
      this.setState({
        showAuth:'block',
        showSignout:'none'
      });
    }
  }

  // Sign in the user upon button click.
  handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
  }

  // Sign out the user upon button click.
  handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
  }

  render() {
    return (
      <div>
        {/*<!--Add buttons to initiate auth sequence and sign out-->*/}
        <button id="authorize-button" style={{display: this.state.showAuth}} onClick={this.handleAuthClick}>
          Authorize
        </button>
        <button id="signout-button" style={{display: this.state.showSignout}} onClick={this.handleSignoutClick}>
          Sign Out
        </button>
        <pre id="content"></pre>
      </div>
    );
  }

  componentDidMount(){
    this.handleClientLoad();
  }
}

GoogleDriveComponents.GDriveUploadBtn = class GDriveUploadBtn extends Component{
  constructor(props) {
     super(props);
     this.state = {status: ''};
     this.handleChange = this.handleChange.bind(this);
   }



  validFileType(file) {
   var fileTypes = [
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/x-flv',
    'video/mp4',
    'video/MP2T',
    'video/3gpp',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-ms-wmv'
   ];
   for(var i = 0; i < fileTypes.length; i++) {
     if(file.type === fileTypes[i]) {
       return true;
     }
   }
   return false;
  }

  createPOSTHeaders(bodySize){
    var h = new Headers();
    h.append('Content-Length', bodySize);
    return h;
  }

  processResponse(response){
    if (response.ok){
      return response.json()
    }
    return response.json()
    .then((error)=>{
      throw new Error(JSON.stringify(error))
      })
  }
  uploadToGDrive(file, fsize) {
    const body = file;
    const headers = this.createPOSTHeaders(fsize);
    const options = {
      method: 'POST',
      headers
    };
    /*fetch('www.example.net', { // Your POST endpoint
    method: 'POST',
    headers: {
      "Content-Type": "You will perhaps need to define a content-type here"
    },
    body: e.currentTarget.result // This is the content of your file
  })*/
    return fetch(uploadURI, {
      method:'POST',
      headers:{},
      body: body}).then(this.processResponse);
  }

   handleChange(event) {
     var currentFiles = event.target.files;
     if (currentFiles.length === 0){
       this.setState({status: 'Upload Error: Please refresh page and try again.'});
     }
     else if (currentFiles.length === 1){
       if (this.validFileType(currentFiles[0])){
         this.setState({status: ''});
         var fsize = currentFiles[0].size;
         this.uploadToGDrive(currentFiles[0], fsize);
       }
       else{
         this.setState({status: 'Upload Error: Use a different video file type.'});
       }
    }
    else{
      this.setState({status: 'Upload Error: Only load one file at a time please.'});
    }
   }

   render() {
     return (
       <form>
           <input type="file" onChange={this.handleChange}></input>
           <p>{this.state.status}</p>
       </form>
     );
   }
}
export default GoogleDriveComponents;
