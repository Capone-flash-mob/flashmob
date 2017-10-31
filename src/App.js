import React, { Component } from 'react';
import fire from './fire';
import HomeView from './HomeView';
import database from './database'
import firebase from 'firebase';
import {BrowserRouter as Router, Route, Link, IndexRoute} from 'react-router-dom';
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

render(){


    if (this.state.authenticated == 'true') {
      console.log("USER FOUND");
      var user = firebase.auth().currentUser;
      return (
         <header class="header">
            <ul class="list-inline ul">
              <li class="list-inline-item"><h1 class="title">capone</h1></li>
              <li class="list-inline-item" style={{float: 'center'}}><Link to="/create">Create a Flashmob</Link></li>
              <li class="list-inline-item pull-right" style={{float: 'pull-right'}}>{user.displayName}</li>
              <button class="btn btn-primary pull-right" onClick={this.signOut}>Sign Out</button>
            </ul>
          </header>)
    }
     else {
      console.log("USER NOT FOUND");
      return(
          <header class="header">
            <ul class="list-inline ul">
              <li class="list-inline-item"><h1 class="title">capone</h1></li>
              <li class="list-inline-item" style={{float: 'center'}}><Link to="/create">Create a Flashmob</Link></li>
              <button class="btn btn-primary pull-right" vertical-align="center" onClick={this.signIn} style={{float: 'center'}}><span>Sign In</span></button>
            </ul>
          </header>
        );
      }
    }
  }


// Creates a page where users can view mob details
class PublicView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flashmob_uid: props.match.params.mobid,
      flashmob: {announcments:[{text:""}]}
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
      <div class="content">
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
              {/*<p> {this.state.flashmob.announcments[0].text}</p>*/}
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
class CreateView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flashmob: null
    };
    // Bind context
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImage = this.handleImage.bind(this);
  }

  addInputField(event){

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
      },
      function(error) {
      },
      function() {
        // Upload completed successfully, now we can get the download URL
        var downloadURL = uploadTask.snapshot.downloadURL;
        switch(name){
          case "bannerImageSub":
            console.log("banener image changed");
            var myFlashMob = self.state.flashmob;
            self.setState({
              flashmob: myFlashMob,
              bannerImage: downloadURL,
            });
            break;

          case "locationImageSub":
            console.log("loaction image changed");
            var myFlashMob = self.state.flashmob;
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
    var pageData = {}
    return (
      <div class="content">
        <form class="App-form" onSubmit={this.handleSubmit}>
          <div class="row">
            <div class="col-sm-2">
            </div>
            <div class="col-sm-8">
              <input class="input" type="text" placeholder="title..." name="title" onChange={this.handleChange}/>
            </div>
            <div class="col-sm-2">
            </div>
          </div>
          <div class="row">
            <div class="col-sm-2">
            </div>
            {this.state.bannerImage === '' ?
              <div class="col-sm-8">
                <input class="input" type="file" onChange={this.handleImage}/>
              </div>
            :
              <div class="col-sm-8">
                <img
                id="BannerImgId"
                src={this.state.bannerImage}
                class="img-responsive media center-block"
                alt=""></img>
                <input class="input" name="bannerImageSub" type="file" onChange={this.handleImage}/>
              </div>
             }
            <div class="col-sm-2">
            </div>
          </div>
          <div class="row">
            <div class="col-sm-2">
            </div>
            <div class="col-sm-8">
              <input class="input" type="text" placeholder="description..." style={{height: '150px'}} name="description" onChange={this.handleChange}/>
            </div>
            <div class="col-sm-2">
            </div>
          </div>
          <div class="row">
            <div class="col-sm-2">
            </div>
            <div class="col-sm-2">
              <input class="input" type="text" placeholder="date..." name="date" onChange={this.handleChange}/>
            </div>
            <div class="col-sm-2">
              <input class="input" type="text" placeholder="time..." name="time" onChange={this.handleChange}/>
            </div>
            <div class="col-sm-4">
              <input class="input" type="text" placeholder="choreographer..." name="choreographer" onChange={this.handleChange}/>
            </div>
            <div class="col-sm-2">
            </div>
          </div>
          <div class="row">
            <div class="col-sm-2">
            </div>
            <div class="col-sm-4">
              <input class="input" type="text" placeholder="location..." name="location" onChange={this.handleChange}/>
            </div>
            <div class="col-sm-4">
              <input class="input" type="text" placeholder="email..." name="email" onChange={this.handleChange}/>
            </div>
            <div class="col-sm-2">
            </div>
          </div>
          <div class="row">
            <div class="col-sm-3">
            </div>
            <div class="col-sm-6">
              <div class="col-sm-2">
              </div>
              <div class="col-sm-8">
                <input class="input" type="text" placeholder="maximum number of people..." name="personLimit" onChange={this.handleChange}/>
              </div>
              <div class="col-sm-2">
              </div>
            </div>
            <div class="col-sm-3">
            </div>
          </div>
          <div class="row">
            <div class="col-sm-3">
            </div>
            <div class="col-sm-6">
              <div class="col-sm-2">
              </div>
              <div class="col-sm-8">
                <button class="button" vertical-align="middle"><span> I am Interested! </span></button>
              </div>
              <div class="col-sm-2">
              </div>
            </div>
            <div class="col-sm-3">
            </div>
          </div>
          <div class="row">
            <div class="col-sm-2">
            </div>
            <div class="col-sm-8">
              <input class="input" type="text" placeholder="video..." style={{height: '300px'}} name="video" onChange={this.handleChange}/>
            </div>
            <div class="col-sm-2">
            </div>
          </div>
          <div class="row">
            <div class="col-sm-2">
            </div>
            <div class="col-sm-1">
              <button class="add-button" onClick={this.addInputField}> + video </button>
            </div>
            <div class="col-sm-2">
            </div>
          </div>
          <div class="row">
            <div class="col-sm-2">
            </div>
            {this.state.locationImage === '' ?
            <div class="col-sm-8">
                <input class="input" type="file" onChange={this.handleImage}/>
            </div>
             :
              <div class="col-sm-8">
                <img
                id="BannerImgId"
                src={this.state.locationImage}
                class="img-responsive media center-block"
                alt="The event location."></img>
                <input class="input" name="locationImageSub" type="file" onChange={this.handleImage}/>
              </div>
               }
            <div class="col-sm-2">
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



{/*
  <div key="a" >
    <div class="col-sm-12" style={styleDiv}>ALL FLASHMOBS</div>
    <div class="row" style={styleDiv}>
      <div key="bigdiv" class="col-sm-12">
        {
        flashList.map((key) =>
          <div class="col-sm-6" style={styleDiv}>
            <div key={key + "value"} class="row">
              <div class="row">
                  <img
                  src={key.bannerImage}
                  class="img-responsive media center-block"
                  alt=""></img>
              </div>
              <Link to={"/mob/" + key.key}>Go To Page</Link>
              <h1 key={key}>{"Description: " + key.description}</h1>
              <h2 >{"Choreographer: " + key.choreographer}</h2>
              <h3 >{"Date: " + key.date}</h3>
              <h3 >{"Time: " + key.time}</h3>
              <hr style={{height:"dd30px"}}/>
            </div>
          </div>
        )
        }
      </div>
    </div>
  </div>
*/}

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
        <div>
          <Headline></Headline>

          {/*Routes*/}
          {/*RR will display the component that has a matching path.
          Variables in the path start with a :colon and can be passed to the component.*/}
          {/*http://localhost:3000/public/mobID*/}
          <Route path="/mob/:mobid" component={PublicView}/>
          <Route path="/create" component={CreateView}/>
          <Route exact path="/" component = {HomeView}/>
          <Route path="/register" component={RegisterView}/>
          <Route path="/demo" component={demo}/>
        </div>
      </Router>
    );
  }
}

export default App;
