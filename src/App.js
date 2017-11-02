import React, { Component } from 'react';
import fire from './fire';
import Headline from './Headline';
import HomeView from './HomeView';
import PublicView from './PublicView';
import CreateView from './CreateView';
import UserView from './UserView';
import RegisterView from './RegisterView';
import database from './database';
import firebase from 'firebase';
import {BrowserRouter as Router, Route, Link, IndexRoute} from 'react-router-dom';
import YouTube from 'react-youtube';
import { withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import gapi from './gapi'

// Allows a user to grant us access to their google drive
class GoogleLogin extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showAuth: "block",
      showSignout: "none"
    };
  }

  // Initializes the API client library and sets up sign-in statelisteners.
  initClient() {
    var self = this;
    var obj = {};

    // Client ID and API key from the Developer Console
    obj["apiKey"] = 'AIzaSyAWsOMuD2IvgMa_DtqEKJKmmG279bWOBpc';
    obj["clientId"] = '873484662570-llocoft6cvqr4rksup2j4a27cbu49df4.apps.googleusercontent.com';

    // Array of API discovery doc URLs for APIs used by the quickstart
    obj["discoveryDocs"] = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    obj["scope"] = 'https://www.googleapis.com/auth/drive.metadata.readonly';

    gapi.client.init(obj).then(function () {
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

class demo extends Component{
  constructor(props) {
    super(props);
    this.state = {};
  }
  render(){
    var style = {
      backgroundColor: "rgb(255,0,255)",
      height: "2em"
    };
    return(
      <div>
        <div class="row" style={style}>Headline  </div>
        <Headline></Headline>
        <div class="row" style={style}>PublicView  </div>
        {/*<PublicView></PublicView>*/}
        <div class="row" style={style}>CreateView  </div>
        <CreateView></CreateView>
        <div class="row" style={style}>HomeView  </div>
        <HomeView></HomeView>
        <div class="row" style={style}>RegisterView  </div>
        <RegisterView></RegisterView>
        <div class="row" style={style}>GoogleLogin  </div>
        <GoogleLogin></GoogleLogin>
        <div class="row" style={style}>  </div>
      </div>
    );
  }
}

//////////////////////////////////////////////////////////////////////////////
// Main - You should only write components, functions, or routes here
//////////////////////////////////////////////////////////////////////////////

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
  }

  render() {
    return (
      //The Router component allows elements inside to use React-router's API
      <Router>
        <div class="container-flex">
          <Headline></Headline>
          <Route exact path="/" component={HomeView}/>
          <Route path="/mob/:mobid" component={PublicView}/>
          <Route path="/create" component={CreateView}/>
          <Route path="/register" component={RegisterView}/>
          <Route path="/user/:userid" component={UserView}/>
          <Route path="/demo" component={demo}/>
        </div>
      </Router>
    );
  }
}

export default App;
