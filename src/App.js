import React, { Component } from 'react';
import fire from './fire';
import Headline from './Headline';
import HomeView from './HomeView';
import FeedbackView from './FeedbackView';
import PublicView from './PublicView';
import CreateView from './CreateView';
import UserView from './UserView';
import RegisterView from './RegisterView';
import AboutView from './AboutView';
import database from './database';
import firebase from 'firebase';
import {BrowserRouter as Router, Route, Link, IndexRoute} from 'react-router-dom';
import YouTube from 'react-youtube';
import { withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import gapi from './gapi';
import SubmitTextLine from './SubmitTextLine';

window.db = database;

// Allows a user to grant us access to their google drive



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
          <Route exact path='/' path="/" component={HomeView}/>
          <Route path="/mob/:mobid" component={PublicView}/>
          <Route path="/create" component={CreateView}/>
          <Route path="/register" component={RegisterView}/>
          <Route path="/about" component={AboutView}/>
          <Route path="/user/:userid" component={UserView}/>
          <Route path="/feedback" component={FeedbackView}/>
        </div>
      </Router>
    );
  }
}

export default App;
