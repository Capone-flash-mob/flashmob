import React, { Component } from 'react';
import database from './database'
import {BrowserRouter as Router, Route, Link, IndexRoute} from 'react-router-dom';
import firebase from 'firebase';
import YouTube from 'react-youtube';

// Creates an input-validated TitleForm
var TitleForm = class TitleForm extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      focused: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      title: event.target.value,
      focused: false,
    });
  }

  render() {
    return (
      <div class="form-group">
        <label forName="title"><i>Flashmob Title:</i></label>
        {this.state.title.length < 50 && !(this.state.focused == false && this.state.title.length == 0) ? (
          <input type="text" onChange={this.handleChange} name="title" class="form-control" id="title"></input>
        ) : (
          <input type="text" onChange={this.handleChange} name="title" class="form-control red-border" id="title"></input>
        )}
      </div>
    )
  }
}

// Creates an input-validated Description
var DescriptionForm = class DescriptionForm extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      title: event.target.value,
    });
  }

  render() {
    return (
      <div class="form-group">
        <label forName="description"><i>Description:</i></label>
        {this.state.title.length < 500 ? (
          <textarea onChange={this.handleChange} name="description" class="form-control" id="description"></textarea>
        ) : (
          <textarea onChange={this.handleChange} name="description" class="form-control red-border" id="description"></textarea>
        )}
      </div>
    )
  }
}

// Creates an input-validated ChoreographerForm
var ChoreographerForm = class ChoreographerForm extends React.Component {
  constructor() {
    super()
    this.state = {
      choreographer: '',
      focused: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      choreographer: event.target.value,
      focused: false,
    });
  }

  render() {
    return (
      <div class="form-group">
        <label forName="choreographer"><i>Choreographer:</i></label>
        {this.state.choreographer.length < 25 && !(this.state.focused == false && this.state.choreographer.length == 0) ? (
          <input type="text" onChange={this.handleChange} name="choreographer" class="form-control" id="choreographer"></input>
        ) : (
          <input type="text" onChange={this.handleChange} name="choreographer" class="form-control red-border" id="choreographer"></input>
        )}
      </div>
    )
  }
}

// Creates an input-validated EmailForm
var EmailForm = class EmailForm extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      focused: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      email: event.target.value,
      focused: false,
    });
  }

  render() {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (
      <div class="form-group">
        <label forName="email"><i>Email:</i></label>
        {!(this.state.focused == false && !regex.test(this.state.email)) && !(this.state.focused == false && this.state.email.length == 0) ? (
          <input type="text" onChange={this.handleChange} name="email" class="form-control" id="email"></input>
        ) : (
          <input type="text" onChange={this.handleChange} name="email" class="form-control red-border" id="email"></input>
        )}
      </div>
    )
  }
}

// Creates a dynamic video form component
var VideoForm = class VideoForm extends React.Component {
  constructor() {
    super()
    this.state = {
      videos: [],
    };
    this.handleVideoTitleChange = this.handleVideoTitleChange.bind(this);
    this.handleVideoIdChange = this.handleVideoIdChange.bind(this);
    this.handleAddVideo = this.handleAddVideo.bind(this);
  }

  handleVideoTitleChange(event) {
    this.setState({
      current_video: event.target.value
    })
  }

  handleVideoIdChange(event) {
    var pureId = event.target.value.replace("https://www.youtube.com/watch?v=", "");
    this.props.handler(event);
    this.setState({
      current_video_id: pureId
    })
  }

  handleAddVideo(event) {
    this.setState({
      videos: this.state.videos.concat([{ title: this.state.current_video, id: this.state.current_video_id }])
    }, function() {
      var vidName = this.state.videos;
      this.props.handler(vidName);
      console.log("LENGTH IS " + this.state.videos.length + " videos");
    })
  }

  handleRemoveVideo = (key) => () => {
    this.setState({
      videos: this.state.videos.filter((current) => key !== current)
    });
  }

  render() {
    const opts = {
      height: '150',
      width: '100%',
    };

    console.log("title" + this.state.videos.length)
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
            {this.state.videos.map((key, index) =>
              <div class="col-sm-2">
                <h3>{key.title}</h3>
                <div class="mob-infobox">
                  <YouTube
                    opts={opts}
                    videoId={key.id}
                  />
                </div>
                <button type="button" class="btn btn-danger" style={{width: '100%', borderRadius: '4px', margin: '0px 0px 10px 0px'}} onClick={this.handleRemoveVideo(key)}>-</button>
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
      videos: [],
    };
    // Bind context
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleVideos = this.handleVideos.bind(this);
  }

  handleChange(event){
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  handleVideos(ChildVideos){
    this.setState({
        videos: ChildVideos,
      });
  }

  handleSubmit(event){
    event.preventDefault(); // <- prevent form submit from reloading the page*/
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
              <TitleForm></TitleForm>
            </div>
            <div class="col-sm-5">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label forName="location"><i>Location:</i></label>
                    <input type="text" onChange={this.handleChange} name="location" class="form-control" id="location"></input>
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
              <DescriptionForm></DescriptionForm>
            </div>
            <div class="col-sm-5">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label forName="date"><i>Date:</i></label>
                    <input type="date" onChange={this.handleChange} name="date" class="form-control" id="date"></input>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label forName="time"><i>Time:</i></label>
                    <input type="time" onChange={this.handleChange} name="time" class="form-control" id="time"></input>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <ChoreographerForm></ChoreographerForm>
                </div>
                <div class="col-sm-6">
                  <EmailForm></EmailForm>
                </div>
              </div>
            </div>
          </div>
          <VideoForm handler={this.handleVideos}></VideoForm>
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
