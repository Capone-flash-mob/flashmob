import React, { Component } from 'react';
import fire from './fire';
import database from './database'
import firebase from 'firebase';
import logo from './logo.svg';
import {BrowserRouter as Router, Route, Link, IndexRoute} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
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
  <div class="container">
    <div class="row">
      <header class="header">
        <h1 class="title"> capone </h1>
        <div class="col-sm-1">
          <Link to="/register">Log In</Link>
        </div>

        <div class="col-sm-1">
           <Link to="/register">Sign Up</Link>
        </div>
      </header>
    </div>
  </div>);
}

// Creates a page where users can view mob details
class MobPublicView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flashmob_uid: props.match.params.mobid,
      flashmob: null
    };
  }
  componentDidMount() {
    var self = this;
    database.getFlashMob(this.state.flashmob_uid, function(flashmob){
      console.log('Received flashmob data for uid', self.state.flashmob_uid, 'with data:', flashmob);
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
            <img
            src={this.state.flashmob.bannerImage}
            class="img-responsive media center-block"
            alt=""></img>
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
            {this.state.flashmob.choreographer}
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
            {this.state.flashmob.email}
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
              {this.state.flashmob.interested + " Interested "}
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
            <img
            src={this.state.flashmob.locationImage}
            class="img-fluid media center-block"
            alt="The event location."></img>
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

    // Bind context
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImage = this.handleImage.bind(this);
  }
  handleChange(event){
    const name = event.target.name;
    const value = event.target.value;
    console.log('State:', this.state);
    this.setState({
      [name]: value
    });
  }
  handleSubmit(event){
    event.preventDefault(); // <- prevent form submit from reloading the page*/
    console.log('Form is being sumitted!\nCurrent State is:', this.state);
    this.setState({
      flashmob: this.state,
    });
    const flashmobKey = database.addFlashmob(this.state);
    alert('Successfully added new mob');
    // Redirect to created flash mob
    this.props.history.push("/public/" + flashmobKey);
  }

  handleImage(event){
    const currentImage = event.target.files[0];
    const name = event.target.name;
    /*const path = event.target.path*/

    var storageRef = fire.storage().ref("BannerImges");
    var uploadTask = storageRef.child(this.state.flashmob_uid + '/BannerImage').put(currentImage);
    var self = this;
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
     }
   }, function(error) {
  }, function() {
  // Upload completed successfully, now we can get the download URL
    var downloadURL = uploadTask.snapshot.downloadURL;
    var myFlashMob;
    switch(name){
      case "bannerImageSub":
               console.log("banener image changed");

        myFlashMob = self.state.flashmob;
        self.setState({
          flashmob: myFlashMob,
          bannerImage: downloadURL,
        });
        break;
       case "locationImageSub":
         console.log("loaction image changed");
         myFlashMob = self.state.flashmob;
        self.setState({
          flashmob: myFlashMob,
          locationImage: downloadURL,
        });
        break;
      }
    }
  );
}

  render() {

    return (
      <div>
        <form class="App-form" onSubmit={this.handleSubmit}>
          <div class="row">
            <div class="col-sm-1">
            </div>
            {this.state.bannerImage === '' ?
            <div class="col-sm-10">
                <input class="input" type="file" onChange={this.handleImage}/>
            </div>
             :
              <div class="col-sm-10">
                <img
                id="BannerImgId"
                src={this.state.bannerImage}
                class="img-responsive media center-block"
                alt=""></img>
                <input class="input" name="bannerImageSub" type="file" onChange={this.handleImage}/>
              </div>
               }
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
            {this.state.locationImage === '' ?
            <div class="col-sm-10">
                <input class="input" type="file" onChange={this.handleImage}/>
            </div>
             :
              <div class="col-sm-10">
                <img
                id="BannerImgId"
                src={this.state.locationImage}
                class="img-responsive media center-block"
                alt="The event location."></img>
                <input class="input" name="locationImageSub" type="file" onChange={this.handleImage}/>
              </div>
               }
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



//Create homepage
class HomeView extends Component {
  constructor(props) {
    super(props);
    this.handleLink = this.handleLink.bind(this);
  }

  componentDidMount() {
    var self = this;
    database.getAllFlashMobs(function(flashmobs){
      self.setState({
        allMobs: flashmobs,
      });
    });
  }

  handleLink(event){
      event.preventDefault(); // <- prevent form submit from reloading the page*/
    console.log("clicked" + event.target.id);
    this.props.history.push("/mob/" + event.target.id);
  }


  render(){
    if (this.state == null){
      return (<div> LOAAAAAAAAADING!!!!!!!!!!!! </div> );
    }
    var flashList = Object.keys(this.state.allMobs);
    console.log("list is " + flashList)
    return(
      <div>
       <div class="col-sm-10">ALL FLASHMOBS</div>
       <div class="col-sm-10">
            {flashList.map((number) =>
              <div class="row">
                <Link to={"/mob/" + number} id={number}>{number}</Link>
              </div>
              )
            }
        </div>
      </div>
      );
  }
}


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
       <div>
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
//////////////////////////////////////////////////////////////////////////////
// Main - You should only write components, functions, or routes here
//////////////////////////////////////////////////////////////////////////////
class App extends Component {
  render() {
    return (
      //The Router component allows elements inside to use React-router's API
      <Router>
        <div>
        <Headline></Headline>

          {/*Routes*/}
          {/*RR will display the component that has a matching path.
          Variables in the path start with a :colon and can be passed to the component.*/}
          {/*http://localhost:3000/public/mobID*/}
          <Route path="/mob/:mobid" component={MobPublicView}/>
          <Route path="/create" component={MobAdminView}/>
          <Route path="/" component = {HomeView}/>
          <Route path="/register" component={RegisterView}/>
        </div>
      </Router>
    );
  }
}


export default App;
