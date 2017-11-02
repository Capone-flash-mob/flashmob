import React, { Component } from 'react';
import fire from './fire';
import HomeView from './HomeView';
import UserView from './UserView';
import PublicView from './PublicView';
import CreateView from './CreateView';
import database from './database';
import firebase from 'firebase';
import {BrowserRouter as Router, Route, Link, IndexRoute} from 'react-router-dom';
import YouTube from 'react-youtube';
import { withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import gapi from './gapi'

//////////////////////////////////////////////////////////////////////////////
// Preprocessing of data - These are accessable on all pages
//////////////////////////////////////////////////////////////////////////////
// var thisFlashMob = getFlashMob("-Kv_DgsoprFx0Z4st7Dq");
//////////////////////////////////////////////////////////////////////////////
// Components - these are like C++ classes for HTML
//////////////////////////////////////////////////////////////////////////////

// Creates a headline banner with our logo and a login button
var provider = new firebase.auth.GoogleAuthProvider();

class Headline extends React.Component{

    constructor(props) {
    super(props);
    this.state = {
      authenticated: 'false'
    };

        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
  }

   componentWillMount() {
    var self = this;
      firebase.auth().onAuthStateChanged(function(user) {
        if(user){
        self.setState({
            authenticated: 'true',
        })
      } else {
        self.setState({
          authenticated: 'false',
        })
      }
      })
    }


  signIn(e){
    e.preventDefault();
    firebase.auth().signInWithPopup(provider).then(function(result){
      var credential = result.credential;
      var user = result.user;
      var userid = user.uid;
      var userEmail = user.email;
      var userName = user.displayName;
      var emailVerified = user.emailVerified;

      database.signInUser(userid, userEmail, userName, emailVerified);
      this.setState({
        authenticated: 'true',
      });
    }).catch(function(error){
    })
  }



  signOut(e){
    e.preventDefault();
    firebase.auth().signOut().then((user) => {
      this.setState({
        authenticated: 'false',
      })

    })
  }
  /*render(){
    if (this.state.authenticated == 'true') {
      console.log("USER FOUND");
      var user = firebase.auth().currentUser;
      return (
         <header class="header" id="menu">
          <ul id="menu-left">
            <li id="li-left"><Link to="/create">Create a Flashmob</Link></li>
            <li id="li-left"><Link to="/about">About</Link></li>
          </ul>
          <Link id="titleMenu" style={{textDecoration: 'none', color: 'white'}} to="/"><h1>capone</h1></Link>
          <ul id="menu-right">
            <li id="li-right" style={{cursor: 'pointer'}} onClick={this.signOut}><a>Sign Out</a></li>
            <li id="li-right"><Link to={"/user/" + user.uid}>{user.displayName}</Link></li>
          </ul>
        </header>
      );
    }
    else {
      console.log("USER NOT FOUND");
      return(
              );
    }
  }*/
  /*render(){
    return (
      <div class="row">
      <header class="navbar">
          <ul class="nav-item">
            <li><Link to="/create">Create a Flashmob</Link></li>
          </ul>
          <ul class="nav-item">
            <li><Link to="/about">About</Link></li>
          </ul>
          <Link id="titleMenu" style={{textDecoration: 'none', color: 'white'}} to="/"><h1>capone</h1></Link>
          <ul id="menu-right">
            <li id="li-right" style={{cursor: 'pointer'}} onClick={this.signIn}><a>Sign In</a></li>

          </ul>
      </header>
      </div>
    );
  }*/

  render() {
    if (this.state.authenticated == 'true') {
      var user = firebase.auth().currentUser;

      return (
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark navbar-container">
          <Link class="navbar-brand navbar-title" to="/">CAPONE</Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse-elements" aria-controls="navbar-collapse-elements" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content navbar-collapse-elements" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <div class="navbar-link-container">
                <Link class="nav-item nav-link navbar-link" to="/Create">Create a flashmob</Link>
              </div>
              <div class="navbar-link-container">
                <Link class="nav-item nav-link navbar-link" to="/about">About</Link>
              </div>
            </div>
            <div class="collapse navbar-collapse justify-content-end navbar-collapse-elements" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <div class="navbar-link-container">
                  <a class="nav-item nav-link navbar-link" onClick={this.signOut}>Sign Out</a>
                </div>
                <div class="navbar-link-container">
                  <Link to={"/user/" + user.uid} style={{textDecoration: 'none'}} ><a class="nav-item nav-link navbar-link mr-auto" >{user.displayName}</a></Link>
                </div>
              </div>
            </div>
            </div>
        </nav>
      );
    }
    else {
      return (

        <nav class="navbar fixed-top navbar-expand-lg navbar-dark navbar-container">
          <Link class="navbar-brand navbar-title" to="/">CAPONE</Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse-elements" aria-controls="navbar-collapse-elements" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-beginning navbar-collapse-elements" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <div class="navbar-link-container">
                <Link class="nav-item nav-link navbar-link" to="/Create">Create a flashmob</Link>
              </div>
              <div class="navbar-link-container">
                <Link class="nav-item nav-link navbar-link" to="/about">About</Link>
              </div>
            </div>
            <div class="collapse navbar-collapse justify-content-end navbar-collapse-elements" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <div class="navbar-link-container">
                  <a class="nav-item nav-link navbar-link" onClick={this.signIn}>Log in</a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      );
    }
  }
}

// Creates a page where users can register
class RegisterView extends Component {
  componentDidMount() {
    var self = this;
    }

  handleLink(event){
  }

  render() {

    var pointStyle = {
      cursor: 'pointer',
    }
    return(
       <div class="content">
        <form class="App-form" onSubmit={this.handleSubmit}>
          <div class="row">
            <div class="col-sm-5">
              <div>First Name:</div>
              <input class="input" placeholder="First Name" type="text" name="firstName"/>
            </div>
            <div class="col-sm-5">
            <div>Last Name:</div>
               <input class="input" placeholder="Last Name" type="text" name="lastName"/>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-10">
            <div>Password:</div>
              <input class="input" placeholder="Password" type="password" name="password"/>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-10">
            <div>Confirrm Password:</div>
               <input class="input" placeholder="Confirm Password" type="password" name="conPassword"/>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-10">
            <div>Email:</div>
                <input class="input" placeholder="Email" type="email" name="email"/>
            </div>
          </div>
        </form>
      </div>
      );
  }
}

// Allows a user to grant us access to their google drive
class GoogleLogin extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showAuth: "block",
      showSignout: "none"
    };
  }

 /**
  *  Initializes the API client library and sets up sign-in state
  *  listeners.
  */
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

 /**
  *  On load, called to load the auth2 library and API client library.
  */
 handleClientLoad() {
   gapi.load('client:auth2', this.initClient.bind(this));
 }

 /**
  *  Called when the signed in status changes, to update the UI
  *  appropriately. After a sign-in, the API is called.
  */
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

 /**
  *  Sign in the user upon button click.
  */
 handleAuthClick(event) {
   gapi.auth2.getAuthInstance().signIn();
 }

 /**
  *  Sign out the user upon button click.
  */
 handleSignoutClick(event) {
   gapi.auth2.getAuthInstance().signOut();
 }

 /**
  * Print an authorized user's filenames and ids.
  */
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

  render(){
    return (
      <div>
        {/*<!--Add buttons to initiate auth sequence and sign out-->*/}
        <button
        id="authorize-button"
        style={{display: this.state.showAuth}}
        onClick={this.handleAuthClick}>
        Authorize
        </button>
        <button
        id="signout-button"
        style={{display: this.state.showSignout}}
        onClick={this.handleSignoutClick}>
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
          {/*Routes*/}
          {/*RR will display the component that has a matching path.
          Variables in the path start with a :colon and can be passed to the component.*/}
          {/*http://localhost:3000/public/mobID*/}
          <Route path="/mob/:mobid" component={PublicView}/>
          <Route path="/create" component={CreateView}/>
          <Route exact path="/" component = {HomeView}/>
          <Route path="/register" component={RegisterView}/>
          <Route path="/user/:userid" component={UserView}/>
          <Route path="/demo" component={demo}/>
        </div>
      </Router>
    );
  }
}

export default App;
