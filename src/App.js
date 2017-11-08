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
import GoogleDriveComponents from './gdrive';

// A page that can be used to temoporarilty display components
class demo extends Component{
  constructor(props) {
    super(props);
    this.state = {};
  }
  render(){
    var style = {
      height: "10em"
    };
    return(
      <div class="content">
      <div className="row" style={style}>
      <div className="col-md-5" style={style}>
      </div>
      <div className="col-md-2" style={style}>
        <GoogleDriveComponents.GoogleLogin></GoogleDriveComponents.GoogleLogin>
        <GoogleDriveComponents.GDriveUploadBtn></GoogleDriveComponents.GDriveUploadBtn>
      </div>
      <div className="col-md-5" style={style}>
      </div>
      </div>
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
