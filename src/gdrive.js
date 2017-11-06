/*
This file contains functions and components related to accessing google drive.
Components:
  - Authentication button
  - Video Upload button
  - File Displays
*/
import React, { Component } from 'react';
import gapi from './gapi'

var GoogleDriveComponents = {};
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

  // Print an authorized user's filenames and ids.
  printFiles() {
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

export default GoogleDriveComponents;
