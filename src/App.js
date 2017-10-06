import React, { Component } from 'react';
import fire from './fire';
import logo from './logo.svg';
import './App.css';
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
    title: "Thriller",
    date: "10-2-2017",
    time: "3:00pm",
    location: "1350 Texas Dr",
    routineVideo: "https://youtu.be/dQw4w9WgXcQ",
    bannerImage: "https://dustn.tv/free-resources/social-covers/facebook-cover-photo-template.jpg",
    locationImg: "https://dustn.tv/free-resources/social-covers/facebook-cover-photo-template.jpg",
    sponser: "Oreos",
    adminID: "o438yt480ht48ty4o8gto84elgh8to4ht8o37ogf",
    contactEmail: "theflashmobsters@gmail.com",
    uid: "NOT_LOGGED_IN",
    peopleIntrested: 247,
    announcments: [
      {text:" Don't forget to wear yellow!", adminID:"o438yt480ht48ty4o8gto84elgh8to4ht8o37ogf", date:"10-3-2017"},
      {text:" Don't forget to wear black!", adminID:"o438yt480ht48ty4o8gto84elgh8to4ht8o37ogf", date:"10-1-2017"},
      {text:" Don't forget to wear maroon!", adminID:"o438yt480ht48ty4o8gto84elgh8to4ht8o37ogf", date:"10-9-2017"}
    ]
  }
}
//////////////////////////////////////////////////////////////////////////////
// Preprocessing of data
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
  <div className="App">
    <header className="App-header">
      <h1 className="App-title"> capone </h1>
      <span>Login</span>
    </header>
  </div>);
}

// Creates a page where users can view mob details
function MobPublicView(props){
  return(
    <div className="App">
      <img src={data["bannerImage"]}></img>
      <h1>{data.title}</h1>
      <div>
        <div>{data.time + " " + data.date}</div>
        <div>{data.location}</div>
        <div>
          <iframe width="420" height="345" src="https://www.youtube.com/embed/XGSy3_Czz8k">
          </iframe>
        </div>
        {data.peopleIntrested + " interested "}
        <input type="button"></input>
        <p> {data.announcments[0].text}</p>
      </div>
    </div>
    );
}
// Creates a page where an admin can view and edit mob details
function MobAdminView(props){
  return (
    <div align="center">
      <form className="App-form" onSubmit={this.addFlashmob.bind(this)}>
        <div align="center" style={{position: 'relative'}}>
          <input className="App-input-large" type="text" placeholder="event banner image..." ref={ el => this.bannerImage = el}/>
          <div align="center" style={{position: 'absolute', top: '0', left: '0', right:'0', padding:'100px'}}>
            <input className="App-input-small" type="text" placeholder="event name..." ref={ el => this.name = el }/>
          </div>
        </div>
        <div align="center">
          <span>
            <input className="App-input-small" type="text" placeholder="event date and time..." ref={ el => this.date = el }/>
            <input className="App-input-small" type="text" placeholder="event choreographer..." ref={ el => this.adminEmail = el }/>
          </span>
          <span>
            <input className="App-input-small" type="text" placeholder="event location..." ref={ el => this.loc = el }/>
            <input className="App-input-small" type="text" placeholder="event choreographer email..." ref={ el => this.adminID = el }/>
          </span>
        </div>
        <div align="center">
          <span>
            <input className="App-input-small" type="text" placeholder="maximum numer of people..." ref={ el => this.maxPeople = el }/>
            <button className="button" vertical-align="middle"><span> I am interested! </span></button>
          </span>
        </div>
        <div align="center">
          <input className="App-input-large" type="text" placeholder="dance choreography video..." ref={ el => this.video = el }/>
        </div>
        <div align="center">
          <input className="App-input-large" type="text" placeholder="event location image..." ref={ el => this.locImg = el }/>
        </div>
        <div align="center">
          <input className="App-input" type="submit"/>
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
        <div>
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
