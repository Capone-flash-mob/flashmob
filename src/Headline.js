import React from 'react';
import database from './database'
import {BrowserRouter as Router, Route, Link, IndexRoute} from 'react-router-dom';
import firebase from 'firebase';

// Creates a headline banner with our logo and a login button
var provider = new firebase.auth.GoogleAuthProvider();

// Creates a header to be used for all pages
var Headline = class Headline extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
      authenticated: 'false',
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
      }
      else {
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
    }).catch(function(error){})
  }

  signOut(e){
    e.preventDefault();
    firebase.auth().signOut().then((user) => {
      this.setState({
        authenticated: 'false',
      })

    })
  }

  render() {
    if (this.state.authenticated == 'true') {
      var user = firebase.auth().currentUser;
      return (
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark navbar-container">
          <Link class="navbar-brand navbar-title" to="/">CΛPONE</Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse-elements" aria-controls="navbar-collapse-elements" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content navbar-collapse-elements" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <div class="navbar-link-container">
                <Link class="nav-item nav-link navbar-link" to="/create">Create a flashmob</Link>
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
                <Link class="nav-item nav-link navbar-link" to="/feedback">Feedback</Link>
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
                <Link class="nav-item nav-link navbar-link" to="/create">Create a flashmob</Link>
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

export default Headline;
