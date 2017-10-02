import React, { Component } from 'react';
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
// Preprocessing of data
console.log(JSON.stringify(getData(1234)))

// Rendering
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
