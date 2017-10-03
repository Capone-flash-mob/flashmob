import React, { Component } from 'react';
import fire from './fire';
import logo from './logo.svg';
import './App.css';
// Functions

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
// Preprocessing of data
var data = getData(1234)

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
        'desc': this.desc.value,
        'loc': this.loc.value
    };

    /* Send the message to Firebase */
    fire.database().ref('flashmobs').push(flashMobInstance);
    this.inputEl.value = ''; // <- clear the input
  }
  render() {
    return (
        <div>
          <form onSubmit={this.addFlashmob.bind(this)}>
            <input type="text" ref={ el => this.name = el }/>
            <input type="text" ref={ el => this.desc = el }/>
            <input type="text" ref={ el => this.loc = el }/>
            <input type="submit"/>
            <ul>
              { /* Render the list of messages */
                this.state.flashmobs.map( flashmob => <li key={flashmob.id}>{flashmob.details.name}</li> )
              }
            </ul>
          </form>
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">Capone</h1>
              <span>Login</span>
            </header>
            <img src={data["bannerImage"]}></img>
            <h1>{data.title}</h1>
            <div>
              <div>{data.time + " " + data.date}</div>
              <div>{data.location}</div>
              <div>
                <iframe width="420" height="345" src="https://www.youtube.com/embed/XGSy3_Czz8k">
                </iframe>
              </div>
              {data.peopleIntrested + "Interested "}
              <input type="button"></input>
              <p> {data.announcments[0].text}</p>
            </div>
          </div>
       </div>
    );
  }
}

export default App;
