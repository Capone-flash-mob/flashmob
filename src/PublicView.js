import React, { Component } from 'react';
import database from './database';
import {BrowserRouter as Router, Route, Link, IndexRoute} from 'react-router-dom';
import YouTube from 'react-youtube'
import firebase from 'firebase';
import SubmitTextLine from './SubmitTextLine';
import fire from './fire';

// Creates a page where users can view mob details
var PublicView = class PublicView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flashmob_uid: props.match.params.mobid,
      showYouTubeLink: false,
      swapEnguagmentButtonsRan: false // Needed to stop infinite loop
    };
    this.addFlashMobToUser = this.addFlashMobToUser.bind(this);
  }

  // Swaps enguagement buttons if user is logged in and a member of the flashmob
  swapEnguagmentButtons(){
    var mythis = this;
    var isMemberOfMob = false;
    var runCount = 0; // Used to stop infinite loop at setState
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        var uuid = firebase.auth().currentUser.uid;
        var fmid = this.state.flashmob_uid;
        database.getMyFlashMobIDs(uuid).then(keys =>{
          var i;
          for (i=0;i<keys.length;i++){
            if(keys[i] == fmid){
              isMemberOfMob = true;
              break;
            }
          }
        })
        .then(()=>{
          if(isMemberOfMob && this.state.swapEnguagmentButtonsRan==false){
            console.log("User is member of this flashmob.")
            this.setState({
              showYouTubeLink: true,
              swapEnguagmentButtonsRan: true
            });
          }
        });
      } else {
        // No user is signed in.
        // I'm Interested Button is shown by default
      }
    });
  }

  addFlashMobToUser(e){
    e.preventDefault();
    if(firebase.auth().currentUser){
      var isInt = {
        'Interested': true,
        'Admin': false,
      }
      var userid = firebase.auth().currentUser.uid;
      var thisFlashMob = this.state.flashmob_uid;
      var userRef = firebase.database().ref('/users/' + userid + '/MyMobs/' + thisFlashMob);
      userRef.update(isInt);
      var newState = this.state;
      this.setState(newState);
    }
  }

  componentDidMount() {
    var self = this;
    database.getFlashMob(this.state.flashmob_uid, function(flashmob){
      console.log('Received flashmob data for uid', self.state.flashmob_uid, 'with data:', flashmob);
      self.setState({
        flashmob_uid: self.state.flashmob_uid,
        flashmob: flashmob,
      });
    });
  }

  adjustTime(time) {
    var time = time.split(':'); // convert to array

    var hours = Number(time[0]);
    var minutes = Number(time[1]);

    var time_value;

    if (hours > 0 && hours <= 12) {
      time_value= "" + hours;
    }
    else if (hours > 12) {
      time_value= "" + (hours - 12);
    }
    else if (hours == 0) {
      time_value= "12";
    }

    time_value += (minutes < 10) ? ":0" + minutes : ":" + minutes;
    time_value += (hours >= 12) ? " P.M." : " A.M.";

    return time_value;
  }

  adjustDate(date) {
    var month_int = parseInt(date.substr(5,2), 10)-1;
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var month_str = months[month_int];
    var date_int = parseInt(date.substr(8,2), 10);
    var date_str = month_str + ' ' + date_int.toString();

    return date_str;
  }

  render(){
    this.swapEnguagmentButtons();
    console.log('-----stateRender', this.state);
    if (this.state.flashmob == null) {
      return (<div> Loading... </div>);
    }

    const primary_opts = {
      height: '400',
      width: '100%',
    };

    return (
      <div class="content">
        <div class="row flashmob-title-container">
          <div class="col-sm-10 offset-sm-1">
            <h1>{this.state.flashmob.title}</h1>
          </div>
        </div>
        <div class="row flashmob-desc-container">
          <div class="col-sm-10 offset-sm-1">
            <span>{this.state.flashmob.description}</span>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-10 offset-sm-1">
            <div class="row">
              <div class="col-sm-8">
                {/* Video Carousel */}
                <div id="video-carousel-example" class="carousel slide carousel-fade" data-ride="carousel">
                  {/* Indicators */}
                  <ol class="carousel-indicators">
                    {this.state.flashmob.videos.map((key, index) =>
                      (index === 0) ? (
                        <li data-target="#video-carousel-example" data-slide-to={index} class="active"></li>
                      ) : (
                        <li data-target="#video-carousel-example" data-slide-to={index}></li>
                      )
                    )}
                  </ol>
                  {/* Slides */}
                  <div class="carousel-inner" role="listbox">
                    {this.state.flashmob.videos.map((key, index) =>
                      (index === 0) ? (
                        <div class="carousel-item active">
                          <YouTube opts={primary_opts} videoId={key.id}/>
                        </div>
                      ) : (
                        <div class="carousel-item">
                          <YouTube opts={primary_opts} videoId={key.id}/>
                        </div>
                      )
                    )}
                  </div>
                  {/* Controls */}
                  <a class="carousel-control-prev" href="#video-carousel-example" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                  <a class="carousel-control-next" href="#video-carousel-example" role="button" data-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="sr-only">Next</span>
                  </a>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="row">
                  <div class="col-sm-10 offset-sm-2">
                    <div class="row flashmob-detail-decoration"></div>
                    <div class="row flashmob-detail-container">
                      <span class="flashmob-detail-subtext">Located In</span>
                      <span class="flashmob-detail-text">{this.state.flashmob.location}</span>
                    </div>
                    <div class="row flashmob-detail-container">
                      <span class="flashmob-detail-subtext">Date & Time</span>
                      <span class="flashmob-detail-text">{this.adjustDate(this.state.flashmob.date)}, {this.adjustTime(this.state.flashmob.time)}</span>
                    </div>
                    <div class="row flashmob-detail-spacer"></div>
                    <div class="row flashmob-detail-container">
                      <span class="flashmob-detail-subtext">Choreographer</span>
                      <span class="flashmob-detail-text">{this.state.flashmob.choreographer}</span>
                    </div>
                    <div class="row flashmob-detail-container">
                      <span class="flashmob-detail-subtext">Contact</span>
                      <span class="flashmob-detail-text">{this.state.flashmob.email}</span>
                    </div>
                    <div class="row flashmob-detail-decoration" style={{marginTop: '13px', marginBottom: '13px'}}></div>
                    <div class="row">
                    {this.state.showYouTubeLink ?
                      (
                        <SubmitTextLine
                        label="YouTube URL:"
                        instructions="Submit a YouTube link here to get feedback!"
                        trigger="submitVideoURL"
                        fmid={this.state.flashmob_uid}></SubmitTextLine>
                      )
                      :
                      (
                        <button type="button" onClick={this.addFlashMobToUser}class="flashmob-interest-button btn btn-lg btn-block">{"I'm Interested"}</button>
                      )
                    }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PublicView;
