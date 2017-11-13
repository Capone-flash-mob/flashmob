import React, { Component } from 'react';
import database from './database'
import {BrowserRouter as Router, Route, Link, IndexRoute} from 'react-router-dom';
import firebase from 'firebase';
import YouTube from 'react-youtube';

// Creates a dynamic video form component
var VideoForm = class VideoForm extends React.Component {
  constructor() {
    super()
    this.state = {
      videos: [{
        title: '',
        id: '',
      }],
    };
  }

  handleVideoTitleChange = (current) => (evt) => {
    const newVideos = this.state.videos.map((this_video, this_id) => {
      if (current !== this_id) {
        return this_video;
      }
      return { ...this_video, title: evt.target.value }
    });
    this.setState({
      videos: newVideos
    });
  }

  handleVideoIdChange = (current) => (evt) => {
    const newVideos = this.state.videos.map((this_video, this_id) => {
      if (current !== this_id) {
        return this_video;
      }
      return { ...this_video, id: evt.target.value }
    });
    this.setState({
      videos: newVideos
    });
  }

  handleAddVideo = () => {
    this.setState({
      videos: this.state.videos.concat([{ title: this.state.videos.title, id: this.state.videos.id }])
    });
  }

  handleRemoveVideo = (current) => () => {
    this.setState({
      videos: this.state.videos.filter((this_video, this_id) => current !== this_id)
    });
  }

  render() {
    const opts = {
      height: '150',
      width: '100%',
    };
    return (
      <div class="row">
        <div class="col-sm-5 offset-sm-1">
          <div class="row">
            <div class="col-sm-6">
              <div class="form-group">
                <label forName="videoTitle"><i>Video Title:</i></label>
                <input name="videoTitle" type="text" class="form-control" id="mainVideoTitle" onChange={this.handleVideoTitleChange}></input>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <label forName="videoID"><i>Video URL:</i></label>
                <div class="input-group">
                  <input name="videoID" type="text" class="form-control" id="mainVideoUrl" style={{borderRadius: '4px'}} onChange={this.handleVideoIdChange}></input>
                  <span class="input-group-btn" style={{paddingLeft: '25px'}}>
                    <button type="button" class="btn btn-success" style={{width: '34px', borderRadius: '4px'}} onClick={this.handleAddVideo}>+</button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-10 offset-sm-1">
          <div class="row">
            {this.state.videos.filter((current_video, current) => (current_video.title !== '') && (current_video.id !== '')).map((current_video, current) =>
              <div class="col-sm-2">
                <h3>{current_video.title},{current_video.id}</h3>
                <h3>{current_video.title}</h3>
                <div class="mob-infobox">
                  <YouTube
                    opts={opts}
                    videoId={current_video.id}
                  />
                </div>
                <button type="button" class="btn btn-danger" style={{width: '100%', borderRadius: '4px', margin: '0px 0px 10px 0px'}} onClick={this.handleRemoveVideo(current)}>-</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

// Creates a page where an admin can view and edit mob details
var CreateView = class CreateView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flashmob: null,
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

    var storageRef = firebase.storage().ref("BannerImges");
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
            console.log("banner image changed");
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
            <div class="col-sm-5 offset-sm-1">
              <div class="form-group">
                <label forName="title"><i>Flashmob Title:</i></label>
                <input type="text" class="form-control" id="title"></input>
              </div>
            </div>
            <div class="col-sm-5">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label forName="location"><i>Location:</i></label>
                    <input type="text" class="form-control" id="location"></input>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div>
                    <label forName="files"><i>Add an Image:</i></label>
                    <input id="files" type="file"></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-5 offset-sm-1">
              <div class="form-group">
                <label forName="description"><i>Description:</i></label>
                <textarea class="form-control" rows="5" id="description"></textarea>
              </div>
            </div>
            <div class="col-sm-5">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label forName="date"><i>Date:</i></label>
                    <input type="text" class="form-control" id="date"></input>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label forName="time"><i>Time:</i></label>
                    <input type="text" class="form-control" id="time"></input>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label forName="choreographer"><i>Choreographer:</i></label>
                    <input type="text" class="form-control" id="choreographer"></input>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label forName="email"><i>Email:</i></label>
                    <input type="text" class="form-control" id="email"></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <VideoForm></VideoForm>
          <div class="row">
            <div class="col-sm-2 offset-sm-5">
              <input class="input btn-default" style={{margin: '50px 0 0 0'}} type="submit"/>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateView;
