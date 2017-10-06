import React, { Component } from 'react';
import fire from './fire';
import logo from './logo.svg';
import './App.css';

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
// var thisFlashMob = getFlashMob("-Kv_DgsoprFx0Z4st7Dq");

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
        'bannerImage': this.bannerImage,
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
        'announcements': this.announcements
    };

    /* Send the message to Firebase */
    fire.database().ref('flashmobs').push(flashMobInstance);
    this.inputEl.value = ''; // <- clear the input
  }
  render() {
    return (
        <div>

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
        </div>
    );
  }
}

export default App;
