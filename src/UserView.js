import React, { Component } from 'react';
import database from './database'
import fire from './fire';
import firebase from 'firebase';

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
    return(
      <div class="content">
      
        <div class="col-sm-12">
          <h2 style={{float: 'center'}}>YOUR FLASHMOBS</h2>
          {flashList.map((key) =>
            <div class="col-sm-4">
              <div class="mob-infobox">
                <img src={key.bannerImage} style={{height: '200px', width: '100%'}} class="img-responsive media center-block" alt=""></img>
                <p> {key.description} </p>
                <p> {key.date}, {key.time} </p>
                <p> {key.location} </p>
                <Link to={"mob/" + key.key}>Click to visit</Link>
              </div>
              <div class="col-sm-8"></div>
            </div>

           
          )}
        </div>
                   

    
        <div class="col-sm-2">
        </div>
        <div class="row">
        </div>
        <hr style={{height:'1px', border:'none',color:'#333',backgroundColor:'#333'}}></hr>
      </div>
    );
  }
}

export default UserView;
