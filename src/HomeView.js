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

  render(){
    if (this.state == null){
      return (<div> LOAAAAAAAAADING!!!!!!!!!!!! </div> );
    }

  const opts = {
        height: '200',
        width: '100%',
      };

    const flashList = this.state.allMobs;
    /*return(
      <div class="content">
        <div class="row">
          <div class="col-sm-8 offset-2">
            {flashList.map((key) =>
              <div class="col-sm-3">
                <Link to={"mob/" + key.key} style={{ textDecoration: 'none'}}>
                  <div class="mob-infobox">
                    <YouTube
                      opts={opts}
                      videoId="D59v74k5flU"
                    />
                    <div class="mob-infobox-details">
                      <span class="mob-infobox-title"> {key.name} </span>
                      <span class="mob-infobox-location"> {key.location} </span>
                      <span class="mob-infobox-date-and-time"> {key.date}, {key.time} </span>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div class="col-sm-2">
        </div>
      </div>
    );*/
    return(
      <div class="content">
        <div class="row">
            {flashList.map((key, index) =>
                <div class="offset-2 col-sm-3">
                  <Link to={"mob/" + key.key} style={{ textDecoration: 'none'}}>
                    <div class="mob-infobox">
                      <YouTube
                        opts={opts}
                        videoId="D59v74k5flU"
                      />
                      <div class="mob-infobox-details">
                        <span class="mob-infobox-title"> {key.name} </span>
                        <span class="mob-infobox-location"> {key.location} </span>
                        <span class="mob-infobox-date-and-time"> {key.date}, {key.time} </span>
                      </div>
                    </div>
                  </Link>
                </div>
            )}
        </div>
      </div>
    );
  }
}

export default HomeView;
