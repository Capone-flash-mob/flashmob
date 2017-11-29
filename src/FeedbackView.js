import React, { Component } from 'react';
import database from './database'
import {BrowserRouter as Router, Route, Link, IndexRoute} from 'react-router-dom';
import YouTube from 'react-youtube'
import firebase from 'firebase';
import SubmitTextLine from './SubmitTextLine';

// Creates a page to view all mobs
var FeedbackView = class FeedbackView extends Component {
  constructor(props) {
    super(props);
    this.handleLink = this.handleLink.bind(this);
  }

  componentDidMount() {
    var self = this;

    //database.getAllFeedbackForUser(this.state.currentUser.uid, function(feedback){
    database.getAllFeedbackForUser(null, function(feedback){
      self.setState({
        'feedback': feedback
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
      width: '100%',
    };

    const feedbackList = this.state.feedback;
    console.log('Feedback list:', feedbackList);

    return(
      <div class="content">
        <div class="row">
          <div class="col-sm-8 offset-sm-2">
            <div class="feedback-columns">
              <div class="row">
                <div class="col-sm-4 feedback-column-text">Submitted By</div>
                <div class="col-sm-4 feedback-column-text">Date of Submission</div>
                <div class="col-sm-4 feedback-column-text">Flashmob</div>
              </div>
            </div>

            <div id="accordion" role="tablist">
              {feedbackList.map((key, index) =>
                <div class="card">
                  <div class="feedback-overview-container" role="tab" id={"heading-" + index}>
                    <a class="collapsed" data-toggle="collapse" href={"#collapse-" + index } aria-expanded="false" aria-controls={"collapse-" + index}>
                      <div class="row">
                        <div class="col-sm-4 feedback-instance-text">{ key.userId } </div>
                        <div class="col-sm-4 feedback-instance-text"> { (new Date(key.time)).toLocaleDateString() } </div>
                        <div class="col-sm-4 feedback-instance-text"> Flashmob Name </div>
                      </div>
                    </a>
                  </div>

                  <div id={"collapse-" + index } class="collapse" role="tabpanel" aria-labelledby={"heading-" + index} data-parent="#accordion">
                    <div class="card-body">
                      <YouTube
                        opts={opts}
                        videoId="D59v74k5flU"
                      />
                      <div class="comments-section">
                        <div class="comments-header"> Comments </div>
                        {key['comments'].map((key, index) =>
                          <div class="comment-container">
                            <span class="comment-text">{key}</span>
                          </div>
                        )}
                        <SubmitTextLine label="" instructions="" placeholder="Comment"></SubmitTextLine>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/*
<div class="col-sm-8 offset-sm-2">
            <div class="row">
              {flashList.map((key, index) =>
                <div class="col-sm-4">
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
          </div>*/
export default FeedbackView;
