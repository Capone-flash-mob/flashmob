import React, { Component } from 'react';
import database from './database'
import fire from './fire';
import firebase from 'firebase';
import YouTube from 'react-youtube';
import {BrowserRouter as Router, Route, Link, IndexRoute} from 'react-router-dom';
// Creates a page to view all mobs
class UserView extends Component {
  constructor(props) {
    super(props);
    this.handleLink = this.handleLink.bind(this);
  }

  componentDidMount() {
    var self = this;
    

    var userID = this.props.match.params.userid

    database.getMyFlashMobs(userID, function(flashmobs){
      console.log("SETTING STATE");
      self.setState({
          myMobs: flashmobs,
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

    var linestyle = {
      border:'none',
      height: '20px',
      width: '90%',
      height: '50px',
      margin: '-50px auto 10px', 
    }
    const flashList = this.state.myMobs;
    const opts = {
        height: '200',
        width: '100%',
      };

    return(
      <div class="content">
        <h1 class="col-sm-8">YOUR FLASHMOBS</h1>
        <div class="row">
          <div class="col-sm-2">
          </div>
          <div class="col-sm-8">
            {flashList.map((key) =>
              <div class="col-sm-6">
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
    );
  }
}

export default UserView;
