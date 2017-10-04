import React, { Component } from 'react';
import fire from './fire';
import logo from './logo.svg';
import './App.css';

// Data
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

// Preprocessing of data
var data = getData(1234);
var thisFlashMob = getFlashMob("-Kv_DgsoprFx0Z4st7Dq");

// Rendering
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { flashmobs: [] }; // <- set up react state
  }
  componentWillMount(){
    /* Create reference to messages in Firebase Database */
    let flashmobsRef = fire.database().ref('flashmobs').orderByKey().limitToLast(100);
    flashmobsRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let flashmob = { details: snapshot.val(), id: snapshot.key };
      this.setState({ flashmobs: [flashmob].concat(this.state.flashmobs) });
    })
  }
  addFlashmob(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    // Construct flashmob object
    var flashMobInstance =  {
        'name': this.name.value,
        'date': this.date.value,
        'time': this.time.value,
        // do we really need a description?
        'description': this.description.value,
        'location': this.location.value,
        'adminID': this.adminID.value,
        'email': this.email.value
        /* @TODO NEED TO ADD FULL SCHEMA HERE
          TAKEN FROM getData() FUNCTION ABOVE
        'loc': this.loc.value,
        'video': this.video.value,
        'bannerImg': this.bannerImg.value,
        'locImg': this.locImg.value,
        // this may need some work. sponsor may not be needed, instead maybe
        // display admin name, admin email (ie: choreographer name and email)
        'sponsor': this.sponsor.value,  // not necessarily the choreographer
        'adminID': this.adminID.value,  // this is the choreographer
        'email': this.email.value,      // choreographer email, rename this for clarification
        'numInterested': 'this.numInterested.value',
        // not sure how this will work with several announcements
        'announcements': 'this.announements.value'
        // not sure that we need ot have 'uid' as part of the flashmob schema,
        // but do we need to include an 'eventID' or something of the sort?
    };

    /* Send the message to Firebase */
    fire.database().ref('flashmobs').push(flashMobInstance);
    this.inputEl.value = ''; // <- clear the input
  }
    /* The form for submission should be placed on the admin edit page to create the flashmob
     * the rest should be displayed on the page for the specific flashmob. We'll need to work
     * out the routes for both of these ASAP so that we can separate the two
    */
  render() {
    return (
        <div>
          <div className="App">
            <header className="App-header">
              <h1 className="App-title"> capone </h1>
              <span>Login</span>
            </header>
          </div>
          <div align="center">
            <form className="App-form" onSubmit={this.addFlashmob.bind(this)}>
              <div align="center" style={{position: 'relative'}}>
                <input className="App-input-large" type="text" placeholder="event banner image..." ref={ el => this.bannerImg = el}/>
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
              <ul>
                { /* Render the list of messages */
                  this.state.flashmobs.map( flashmob => <li key={flashmob.id}>{flashmob.details.name}</li> )
                }
              </ul>
            </form>
          </div>       
          /*
          <input type="text" placeholder="name"ref={ el => this.name = el }/>
          <input type="text" placeholder="description" ref={ el => this.description = el }/>
          <input type="text" placeholder="location" ref={ el => this.location = el }/>
          <input type="date" placeholder="date" ref={ el => this.date = el }/>
          <input type="time" placeholder="time" ref={ el => this.time = el }/>
          <input type="text" placeholder="adminID" ref= {el => this.adminID = el}/>
          <input type="email" placeholder="email" ref= {el => this.email = el}/>
          <input type="submit"/>  
          */
      <div className="App">
        <header className="App-header">
          <h1 id="flashMobTitle" className="App-title">Capone</h1>
          <div id="flashMobDescription">{data.sponser}</div>
        </header> 
          <img src={data["bannerImage"]}></img>
          <h1 id="flashMobName">{data.title}</h1>
          <div>
            <div id="flashMobDate">{data.time + " " + data.date}</div>
            <div id="flashMobTime">{data.date}</div>
            <div>
              <iframe width="420" height="345" src="https://www.youtube.com/embed/XGSy3_Czz8k">
              </iframe>
            </div>
            {data.peopleInterested + " interested "}
            <input type="button"></input>
            <p> {data.announcments[0].text}</p>
          </div>
        </div>
	    </div>
    );
  }
}

export default App;