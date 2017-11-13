import React, { Component } from 'react';
import database from './database'
import {BrowserRouter as Router, Route, Link, IndexRoute} from 'react-router-dom';
import YouTube from 'react-youtube'
import firebase from 'firebase';

// Creates a page where users can view mob details
var PublicView = class PublicView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flashmob_uid: props.match.params.mobid,
      flashmob: {announcments:[{text:""}]}
    };
    this.addFlashMobToUser = this.addFlashMobToUser.bind(this);
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
    }
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
            <h1>{this.state.flashmob.name}</h1>
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
                    <li data-target="#video-carousel-example" data-slide-to="0" class="active"></li>
                    <li data-target="#video-carousel-example" data-slide-to="1"></li>
                    <li data-target="#video-carousel-example" data-slide-to="2"></li>
                  </ol>
                  {/* Slides */}
                  <div class="carousel-inner" role="listbox">
                    <div class="carousel-item active">
                      <YouTube opts={primary_opts} videoId="D59v74k5flU"/>
                    </div>
                    <div class="carousel-item">
                      <YouTube opts={primary_opts} videoId="dMH0bHeiRNg"/>
                    </div>
                    <div class="carousel-item">
                      <YouTube opts={primary_opts} videoId="9bZkp7q19f0"/>
                    </div>
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
              <div class="col-sm-3">
                <div class="row">
                  <div class="col-sm-10 offset-sm-2">
                    <div class="row flashmob-detail-decoration"></div>
                    <div class="row flashmob-detail-container">
                      <span class="flashmob-detail-subtext">Located in</span>
                      <span class="flashmob-detail-text">{this.state.flashmob.location}</span>
                    </div>
                    <div class="row flashmob-detail-container">
                      <span class="flashmob-detail-subtext">Date & Time</span>
                      <span class="flashmob-detail-text">{this.state.flashmob.date}, {this.state.flashmob.time}</span>
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
                    <div class="row">
                      <button type="button" onClick={this.addFlashMobToUser}class="flashmob-interest-button btn btn-lg btn-block">{"I'm Interested"}</button>
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
