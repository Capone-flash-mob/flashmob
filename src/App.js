import React, { Component } from 'react';
import fire from './fire';
import database from './database'
import logo from './logo.svg';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
//////////////////////////////////////////////////////////////////////////////
// Preprocessing of data - These are accessable on all pages
//////////////////////////////////////////////////////////////////////////////
// var thisFlashMob = getFlashMob("-Kv_DgsoprFx0Z4st7Dq");
//////////////////////////////////////////////////////////////////////////////
// Components - these are like C++ classes for HTML
//////////////////////////////////////////////////////////////////////////////

// Creates a headline banner with our logo and a login button
function Headline(props){
  return(
  <div class="row">
    <header class="header">
      <h1 class="title"> capone </h1>
      <span>Login</span>
    </header>
  </div>);
}

// Creates a page where users can view mob details
class MobPublicView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flashmob_uid: props.match.params.mobid,
      flashmob: null
    };
  }
  componentDidMount() {
    console.log('AAAAAAAAA');
    var self = this;
    database.getFlashMob(this.state.flashmob_uid, function(flashmob){
      console.log('Received flashmob data for uid', self.state.flashmob_uid, 'with data:', flashmob);
      console.log('Self:', self);
      self.setState({
        flashmob_uid: self.state.flashmob_uid,
        flashmob: flashmob
      });
    });
  }
  render(){
    if (this.state.flashmob == null){
      return (<div> LOAAAAAAAAADING!!!!!!!!!!!! </div> );
    }
    return(
      <div>
        <div class="row">
            <img src={this.state.flashmob.bannerImage} class="img-responsive media center-block"></img>
        </div>
        <div class="row">
          <div class="col-sm-1">
          </div>
          <div class="col-sm-10">
            <div class="infobox">
            <h1>{this.state.flashmob.title}</h1>
            </div>
          </div>
          <div class="col-sm-1">
          </div>
        </div>
        <div class="row">
          <div class="col-sm-1">
          </div>
          <div class="col-sm-10">
            <div class="description">
            <p>{this.state.flashmob.description}</p>
            </div>
          </div>
          <div class="col-sm-1">
          </div>
        </div>
        <div class="row">
          <div class="col-sm-1">
          </div>
          <div class="col-sm-3">
            <div class="infobox">
            {this.state.flashmob.date}
            </div>
          </div>
          <div class="col-sm-2">
            <div class="infobox">
            {this.state.flashmob.time}
            </div>
          </div>
          <div class="col-sm-5">
            <div class="infobox">
            {this.state.flashmob.adminName}
            </div>
          </div>
          <div class="col-sm-1">
          </div>
        </div>
        <div class="row">
          <div class="col-sm-1">
          </div>
          <div class="col-sm-5">
            <div class="infobox">
            {this.state.flashmob.location}
            </div>
          </div>
          <div class="col-sm-5">
            <div class="infobox">
            {this.state.flashmob.contactEmail}
            </div>
          </div>
          <div class="col-sm-1">
          </div>
        </div>
        <div class="row">
          <div class="col-sm-3">
          </div>
          <div class="col-sm-6">
            <div class="col-sm-1">
            </div>
            <div class="col-sm-10">
              <div class="infobox">
              {this.state.flashmob.peopleIntrested + " Interested "}
              </div>
            </div>
            <div class="col-sm-1">
            </div>
          </div>
          <div class="col-sm-3">
          </div>
        </div>
        <div class="row">
          <div class="col-sm-3">
          </div>
          <div class="col-sm-6">
            <div class="col-sm-1">
            </div>
            <div class="col-sm-10">
              <button class="button" vertical-align="middle"><span> I am Interested! </span></button>
            </div>
            <div class="col-sm-1">
            </div>
          </div>
          <div class="col-sm-3">
          </div>
        </div>
        <div class="row">
          <div class="col-sm-1">
          </div>
          <div class="col-sm-10">
          <iframe class="media center-block" src="https://www.youtube.com/embed/XGSy3_Czz8k?controls=1">
          </iframe>
          </div>
          <div class="col-sm-1">
          </div>
        </div>
        <div class="row">
          <div class="col-sm-1">
          </div>
          <div class="col-sm-10">
            <img src={this.state.flashmob.locationImg} class="img-fluid media center-block"></img>
          </div>
          <div class="col-sm-1">
          </div>
        </div>
        <div class="row">
          <div class="col-sm-1">
          </div>
          <div class="col-sm-10">
            <div class="announcements">
              <strong>Announcments: </strong>
              <p> {this.state.flashmob.announcments[0].text}</p>
            </div>
          </div>
          <div class="col-sm-1">
          </div>
        </div>
      </div>
      );
  }
}
// Creates a page where an admin can view and edit mob details
class MobAdminView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flashmob_uid: props.match.params.mobid,
      flashmob: null
    };
  }
  handleChange(event){
    // Does this work?
    /*var flashMobInstance =  {
      'name': this.name.value,
      'bannerImage': this.bannerImage.value,
      'description': this.description.value,
      'date': this.date.value,
      'time': this.time.value,
      'location': this.location.value,
      'adminID': this.adminID.value,
      'adminName': this.adminName.value,
      'adminEmail': this.adminEmail.value,
      'numInterested': this.numInterested.value,
      'video': this.video.value,
      'locationImg': this.locImage.value,
    }*/
  }
  handleSubmit(event){
    /*event.preventDefault(); // <- prevent form submit from reloading the page
  }

  render() {
    var pageData = {}

    return (
      <div>
        <form class="App-form" onSubmit={this.state.handleSubmit}>
          <div class="row">
            <div class="col-sm-1">
            </div>
            <div class="col-sm-10">
              <input class="input" type="text" placeholder="banner image..." style={{height: '300px'}} name="bannerImage" onChange={this.handleChange}/>
            </div>
            <div class="col-sm-1">
            </div>
          </div>
          <div class="row">
            <div class="col-sm-1">
            </div>
            <div class="col-sm-10">
              <input class="input" type="text" placeholder="description..." style={{height: '150px'}} name="description" onChange={this.handleChange}/>
            </div>
            <div class="col-sm-1">
            </div>
          </div>
          <div class="row">
            <div class="col-sm-1">
            </div>
            <div class="col-sm-3">
              <input class="input" type="text" placeholder="date..." name="date" onChange={this.handleChange}/>
            </div>
            <div class="col-sm-2">
              <input class="input" type="text" placeholder="time..." name="time" onChange={this.handleChange}/>
            </div>
            <div class="col-sm-5">
              <input class="input" type="text" placeholder="choreographer..." name="choreographer" onChange={this.handleChange}/>
            </div>
            <div class="col-sm-1">
            </div>
          </div>
          <div class="row">
            <div class="col-sm-1">
            </div>
            <div class="col-sm-5">
              <input class="input" type="text" placeholder="location..." name="location" onChange={this.handleChange}/>
            </div>
            <div class="col-sm-5">
              <input class="input" type="text" placeholder="email..." name="email" onChange={this.handleChange}/>
            </div>
            <div class="col-sm-1">
            </div>
          </div>
          <div class="row">
            <div class="col-sm-3">
            </div>
            <div class="col-sm-6">
              <div class="col-sm-1">
              </div>
              <div class="col-sm-10">
                <input class="input" type="text" placeholder="maximum number of people..." name="personLimit" onChange={this.handleChange}/>
              </div>
              <div class="col-sm-1">
              </div>
            </div>
            <div class="col-sm-3">
            </div>
          </div>
          <div class="row">
            <div class="col-sm-3">
            </div>
            <div class="col-sm-6">
              <div class="col-sm-1">
              </div>
              <div class="col-sm-10">
                <button class="button" vertical-align="middle"><span> I am Interested! </span></button>
              </div>
              <div class="col-sm-1">
              </div>
            </div>
            <div class="col-sm-3">
            </div>
          </div>
          <div class="row">
            <div class="col-sm-1">
            </div>
            <div class="col-sm-10">
              <input class="input" type="text" placeholder="video..." style={{height: '300px'}} name="video" onChange={this.handleChange}/>
            </div>
            <div class="col-sm-1">
            </div>
          </div>
          <div class="row">
            <div class="col-sm-1">
            </div>
            <div class="col-sm-10">
              <input class="input" type="text" placeholder="location image..." style={{height: '300px'}} name="locationImg" onChange={this.handleChange}/>
            </div>
            <div class="col-sm-1">
            </div>
          </div>
          <div class="row">
            <div class="col-sm-3">
            </div>
            <div class="col-sm-6">
              <div class="col-sm-2">
              </div>
              <div class="col-sm-8">
                <input class="input" type="submit"/>
              </div>
              <div class="col-sm-2">
              </div>
            </div>
            <div class="col-sm-3">
            </div>
          </div>
        </form>
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
    /*this.state = {};*/
  }
  render() {
    return (
      //The Router component allows elements inside to use React-router's API
      <Router>
        <div class="container">
          <Headline></Headline>
        {/*@TODO: Ask backend if we even need this, remove if not needed*/}
          {/*<SubscriberForm></SubscriberForm>*/}

          {/*Routes*/}
          {/*RR will display the component that has a matching path.
          Variables in the path start with a :colon and can be passed to the component.*/}
          {/*http://localhost:3000/public/mobID*/}
          <Route path="/public/:mobid" component={MobPublicView}/>
          {/*@TODO: Convert Admin page into a react component */}
          <Route path="/admin/:mobid" component={MobAdminView}/>
        </div>
      </Router>
    );
  }
}

export default App;
