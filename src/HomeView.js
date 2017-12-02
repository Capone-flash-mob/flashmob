import React, { Component } from 'react';
import database from './database'
import {BrowserRouter as Router, Route, Link, IndexRoute} from 'react-router-dom';
import YouTube from 'react-youtube'

// Creates a page to view all mobs
var HomeView = class HomeView extends Component {
  constructor(props) {
    super(props);
    this.handleLink = this.handleLink.bind(this);
  }

  componentDidMount() {
    var self = this;
    database.getAllFlashMobs(function(flashmobs){
      self.setState({
        allMobs: flashmobs,
      });
    });
  }

  handleLink(event){
    event.preventDefault(); // <- prevent form submit from reloading the page*/
    console.log("clicked" + event.target.id);
    this.props.history.push("/mob/" + event.target.id);
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

  render(){
    if (this.state == null){
      return (<div> LOAAAAAAAAADING!!!!!!!!!!!! </div> );
    }

    const opts = {
      height: '200',
      width: '100%',
    };

    const flashList = this.state.allMobs;

    return(
      <div class="content">
        <div class="row">
          <div class="col-sm-8 offset-sm-2">
            <div class="row">
              {flashList.map((key, index) =>
                <div class="col-sm-4">
                  <Link to={"mob/" + key.key} style={{ textDecoration: 'none'}}>
                    <div class="mob-infobox">
                      <YouTube
                        opts={opts}
                        videoId={key.videos[0].id}
                      />
                      <div class="mob-infobox-details">
                        <span class="mob-infobox-title">{key.title}</span>
                        <span class="mob-infobox-location">{key.location}</span>
                        <span class="mob-infobox-date-and-time">{key.date}, {this.adjustTime(key.time)}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeView;
