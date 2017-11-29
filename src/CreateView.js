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
    }, () => {this.props.handler(this.state.title);});
  }

  render() {
    return (
      <div class="form-group">
        <label forName="title"><i>Flashmob Title:</i></label>
        {this.state.title.length < 50 && !(this.state.focused === false && this.state.title.length === 0) ? (
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
      description: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      description: event.target.value,
    }, () => {this.props.handler(this.state.description);});
  }

  render() {
    return (
      <div class="form-group">
        <label forName="description"><i>Description:</i></label>
        {this.state.description.length < 500 ? (
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
    }, () => {this.props.handler(this.state.choreographer);});
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
    }, () => {this.props.handler(this.state.email);});
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

// Creates an input-validated LocationForm
var LocationForm = class LocationForm extends React.Component {
  constructor() {
    super()
    this.state = {
      location: '',
      focused: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      location: event.target.value,
      focused: false,
    }, () => {this.props.handler(this.state.location);});
  }

  render() {
    return (
      <div class="form-group">
        <label forName="location"><i>Location:</i></label>
        {!(this.state.focused == false && this.state.location.length == 0) ? (
          <input type="text" onChange={this.handleChange} name="location" class="form-control" id="location"></input>
        ) : (
          <input type="text" onChange={this.handleChange} name="location" class="form-control red-border" id="location"></input>
        )}
      </div>
    )
  }
}

// Creates an input-validated DateForm
var DateForm = class DateForm extends React.Component {
  constructor() {
    super()
    this.state = {
      date: '',
      focused: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      date: event.target.value,
      focused: false,
    }, () => {this.props.handler(this.state.date);});
  }

  render() {
    return (
      <div class="form-group">
        <label forName="date"><i>Date:</i></label>
        {!(this.state.focused == false && this.state.date.length == 0) ? (
          <input type="date" onChange={this.handleChange} name="date" class="form-control" id="date"></input>
        ) : (
          <input type="date" onChange={this.handleChange} name="date" class="form-control red-border" id="date"></input>
        )}
      </div>
    )
  }
}

// Creates an input-validated TimeForm
var TimeForm = class TimeForm extends React.Component {
  constructor() {
    super()
    this.state = {
      time: '',
      focused: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      time: event.target.value,
      focused: false,
    }, () => {this.props.handler(this.state.time);});
  }

  render() {
    return (
      <div class="form-group">
        <label forName="time"><i>Time:</i></label>
        {!(this.state.focused == false && this.state.time.length == 0) ? (
          <input type="time" onChange={this.handleChange} name="time" class="form-control" id="time"></input>
        ) : (
          <input type="time" onChange={this.handleChange} name="time" class="form-control red-border" id="time"></input>
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
      authenticated: false,
      flashmob: null,
      title: '',
      description: '',
      choreographer: '',
      location: '',
      email: '',
      date: '',
      time: '',
      videos: [],
      feedback: []
    };
    // Bind context
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleChoreographer = this.handleChoreographer.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleTime = this.handleTime.bind(this);
    this.handleVideos = this.handleVideos.bind(this);
  }

   componentDidMount() {

    var self = this;
    var userID = this.props.match.params.userid

    firebase.auth().onAuthStateChanged(function(user) {
      if(user){
        var myUser = database.getUser(user.uid, function(customUser){
          self.setState({
          authenticated: 'true',
          currentUser: customUser,
          })
        })
      }
      else {
        self.setState({
          authenticated: 'false',
        })
      }
    })
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  handleTitle(_title) {
    this.setState({
      title: _title,
    });
  }

  handleDescription(_description) {
    this.setState({
      description: _description,
    });
  }

  handleChoreographer(_choreographer) {
    this.setState({
      choreographer: _choreographer,
    });
  }

  handleEmail(_email) {
    this.setState({
      email: _email,
    });
  }

  handleLocation(_location) {
    this.setState({
      location: _location,
    });
  }

  handleDate(_date) {
    this.setState({
      date: _date,
    });
  }

  handleTime(_time) {
    this.setState({
      time: _time,
    });
  }

  handleVideos(_videos) {
    this.setState({
      videos: _videos,
    });
  }

  handleSubmit(event) {
    if (this.state.title.length === 0) {
      event.preventDefault();
      alert('Title is required');
    }
    else if (this.state.choreographer.length === 0) {
      event.preventDefault();
      alert('Choreographer is required');
    }
    else if (this.state.email.length === 0) {
      event.preventDefault();
      alert('Email is required');
    }
    else if (this.state.location.length === 0) {
      event.preventDefault();
      alert('Location is required');
    }
    else if (this.state.date === undefined) {
      event.preventDefault();
      alert('Date is required');
    }
    else if (this.state.time === undefined) {
      event.preventDefault();
      alert('Time is required');
    }
    else {
      event.preventDefault(); // <- prevent form submit from reloading the page*/
      this.setState({
        flashmob: this.state,
      });
      const flashmobKey = database.addFlashmob(this.state);
      alert('Successfully added new mob');
      // Redirect to created flash mob
      this.props.history.push("/mob/" + flashmobKey);
    }
  }

  handleImage(event) {
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

    if(this.state.authenticated==='true'){
            console.log("AUTHTHTHTHT AUTHTHTHTTRUUEEE " + this.state.authenticated)

    return (
      <div class="content">
        <form class="App-form" onSubmit={this.handleSubmit}>
          <div class="row">
            <div class="col-sm-5 offset-sm-1">
              <TitleForm handler={this.handleTitle}></TitleForm>
            </div>
            <div class="col-sm-5">
              <div class="row">
                <div class="col-sm-6">
                  <LocationForm handler={this.handleLocation}></LocationForm>
                </div>
                <div class="col-sm-6">
                  <div>
                    <label forName="files"><i>Add an Image:</i></label>
                    <input id="files" type="file" accept="image/*"></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-5 offset-sm-1">
              <DescriptionForm handler={this.handleDescription}></DescriptionForm>
            </div>
            <div class="col-sm-5">
              <div class="row">
                <div class="col-sm-6">
                  <DateForm handler={this.handleDate}></DateForm>
                </div>
                <div class="col-sm-6">
                  <TimeForm handler={this.handleTime}></TimeForm>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <ChoreographerForm handler={this.handleChoreographer}></ChoreographerForm>
                </div>
                <div class="col-sm-6">
                  <EmailForm handler={this.handleEmail}></EmailForm>
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
  } else {
    return(
      <div class="content">
        <div class="row">
          <div class="col-sm-6 offset-sm-4">
            PLEASE SIGN IN TO CREATE FLASHMOB
          </div>
        </div>
      </div>
      );
  }

}
}

export default CreateView;
