import React, { Component } from 'react';
import fire from './fire';
import database from './database'
import logo from './logo.svg';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
//////////////////////////////////////////////////////////////////////////////
// Regular Javascript Functions
//////////////////////////////////////////////////////////////////////////////
// Get full flashMob item using flashMobId
function getFlashMob(flashMobId){
  var flashMobRef = fire.database().ref('/flashmobs/'+flashMobId);
  flashMobRef.once("value").then(function(snapshot){
    console.log(snapshot.val());
    var flashMobSnap = snapshot.val();
    document.getElementById("flashMobTitle").innerHTML = flashMobSnap.name;
    document.getElementById("flashMobDate").innerHTML = flashMobSnap.date + flashMobSnap.time;
    document.getElementById("flashMobName").innerHTML = flashMobSnap.location;
    document.getElementById("flashMobDescription").innerHtml = flashMobSnap.description;
    return flashMobSnap;
    })
  }

//////////////////////////////////////////////////////////////////////////////
// Data
//////////////////////////////////////////////////////////////////////////////
function getData(config) {
  return {
    adminName: "Jessica",
    title: "Thriller",
    description:"We're having a flash mob at the county fair!",
    date: "10-2-2017",
    time: "3:00pm",
    location: "1350 Texas Dr",
    routineVideo: "https://youtu.be/dQw4w9WgXcQ",
    bannerImage: "https://dustn.tv/free-resources/social-covers/facebook-cover-photo-template.jpg",
    locationImg: "http://www.alfano.com/wp-content/uploads/2014/04/opus-portfolio-placeholder-300x300.png",
    sponser: "Oreos",
    adminID: "o438yt480ht48ty4o8gto84elgh8to4ht8o37ogf",
    contactEmail: "theflashmobsters@gmail.com",
    uid: "NOT_LOGGED_IN",
    video: "https://www.youtube.com/embed/XGSy3_Czz8k",
    peopleIntrested: 247,
    announcments: [
      {text:" Don't forget to wear yellow!", adminID:"o438yt480ht48ty4o8gto84elgh8to4ht8o37ogf", date:"10-3-2017"},
      {text:" Don't forget to wear black!", adminID:"o438yt480ht48ty4o8gto84elgh8to4ht8o37ogf", date:"10-1-2017"},
      {text:" Don't forget to wear maroon!", adminID:"o438yt480ht48ty4o8gto84elgh8to4ht8o37ogf", date:"10-9-2017"}
    ]
  }
}
//////////////////////////////////////////////////////////////////////////////
// Preprocessing of data - These are accessable on all pages
//////////////////////////////////////////////////////////////////////////////
var data = getData()
// var thisFlashMob = getFlashMob("-Kv_DgsoprFx0Z4st7Dq");
//////////////////////////////////////////////////////////////////////////////
// Components - these are like C++ classes for HTML
//////////////////////////////////////////////////////////////////////////////
/*All new components must at least have this code*/
function ExampleProp(props){
  return (
      <div>

      </div>
    );
}
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
function MobPublicView(props){
  return(
    <div>
      <div class="row">
          <img src={data.bannerImage} class="img-responsive media center-block"></img>
      </div>
      <div class="row">
        <div class="col-sm-1">
        </div>
        <div class="col-sm-10">
          <div class="infobox">
          <h1>{data.title}</h1>
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
          <p>{data.description}</p>
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
          {data.date}
          </div>
        </div>
        <div class="col-sm-2">
          <div class="infobox">
          {data.time}
          </div>
        </div>
        <div class="col-sm-5">
          <div class="infobox">
          {data.adminName}
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
          {data.location}
          </div>
        </div>
        <div class="col-sm-5">
          <div class="infobox">
          {data.contactEmail}
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
            {data.peopleIntrested + " Interested "}
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
          <img src={data.locationImg} class="img-fluid media center-block"></img>
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
            <p> {data.announcments[0].text}</p>
          </div>
        </div>
        <div class="col-sm-1">
        </div>
      </div>
    </div>
    );
}
// Creates a page where an admin can view and edit mob details
function MobAdminView(props){
  /*constructor(props) {
    super(props);
    this.state = { flashmobs: [] }; // <- set up react state
  }*/
  /*componentWillMount(){*/
    /* Create reference to messages in Firebase Database */
    /*let flashmobsRef = fire.database().ref('flashmobs').orderByKey().limitToLast(100);*/
    /*flashmobsRef.on('child_added', snapshot => {*/
      /* Update React state when message is added at Firebase Database */
      /*let flashmob = { details: snapshot.val(), id: snapshot.key };*/
      /*this.setState({ flashmobs: [flashmob].concat(this.state.flashmobs) });*/
    /*})*/
  /*}*/
  var pageData = {}

  pageData.addFlashmob = function (e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    // Construct flashmob object
    var flashMobInstance =  {
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
        'locImage': this.locImage.value,
        'announcements': this.announcements.value
    };

    /* Send the message to Firebase */
    fire.database().ref('flashmobs').push(flashMobInstance);
    this.inputEl.value = ''; // <- clear the input
  }
  return (
    <div>
      <form class="App-form" onSubmit={pageData.addFlashmob.bind(pageData)}>
        <div class="row">
          <div class="col-sm-1">
          </div>
          <div class="col-sm-10">
            <input class="input" type="text" placeholder="banner image..." style={{height: '300px'}} ref={ el => pageData.bannerImage = el}/>
          </div>
          <div class="col-sm-1">
          </div>
        </div>
        <div class="row">
          <div class="col-sm-1">
          </div>
          <div class="col-sm-10">
            <input class="input" type="text" placeholder="description..." style={{height: '150px'}} ref={ el => pageData.description = el}/>
          </div>
          <div class="col-sm-1">
          </div>
        </div>
        <div class="row">
          <div class="col-sm-1">
          </div>
          <div class="col-sm-3">
            <input class="input" type="text" placeholder="date..." ref={ el => pageData.date = el}/>
          </div>
          <div class="col-sm-2">
            <input class="input" type="text" placeholder="time..." ref={ el => pageData.time = el}/>
          </div>
          <div class="col-sm-5">
            <input class="input" type="text" placeholder="choreographer..." ref={ el => pageData.adminName = el}/>
          </div>
          <div class="col-sm-1">
          </div>
        </div>
        <div class="row">
          <div class="col-sm-1">
          </div>
          <div class="col-sm-5">
            <input class="input" type="text" placeholder="location..." ref={ el => pageData.location = el}/>
          </div>
          <div class="col-sm-5">
            <input class="input" type="text" placeholder="email..." ref={ el => pageData.adminEmail = el}/>
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
              <input class="input" type="text" placeholder="maximum number of people..." ref={ el => pageData.numInterested = el}/>
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
            <input class="input" type="text" placeholder="video..." style={{height: '300px'}} ref={ el => pageData.video = el}/>
          </div>
          <div class="col-sm-1">
          </div>
        </div>
        <div class="row">
          <div class="col-sm-1">
          </div>
          <div class="col-sm-10">
            <input class="input" type="text" placeholder="location image..." style={{height: '300px'}} ref={ el => pageData.locImage = el}/>
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
//////////////////////////////////////////////////////////////////////////////
// Main - You should only write components, functions, or routes here
//////////////////////////////////////////////////////////////////////////////
class App extends Component {
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
          <Route path="/public/:mob" component={MobPublicView}/>
          {/*@TODO: Convert Admin page into a react component */}
          <Route path="/admin/:mob" component={MobAdminView}/>
        </div>
      </Router>
    );
  }
}

export default App;
