import React, { Component } from 'react';
import database from './database'
import {BrowserRouter as Router, Route, Link, IndexRoute} from 'react-router-dom';
// Creates a page to view all mobs
class HomeView extends Component {
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

  var colors = ['silver', 'gray', 'red', 'maroon', 'yellow', 'olive', 'lime', 'green',
              'aqua', 'teal', 'blue', 'navy', 'fuchsia', 'purple'];

  var rand = Math.floor((Math.random() * 8));
  const styleDiv = {
    border:'2px solid #000000',
    backgroundColor: colors[rand],
  }
    const flashList = this.state.allMobs;
    console.log("YAYAYAYA " + flashList[0].key);
    return(
      <div class="content">
        <div class="col-sm-2">
        </div>
        <div class="col-sm-8">
          {flashList.map((key) =>
            <div class="col-sm-6">
              <div class="mob-infobox">
                <img src={key.bannerImage} style={{height: '200px', width: '100%'}} class="img-responsive media center-block" alt=""></img>
                <p> {key.description} </p>
                <p> {key.date}, {key.time} </p>
                <p> {key.location} </p>
                <Link to={"mob/" + key.key}>Click to visit</Link>
              </div>
            </div>
          )}
        </div>
        <div class="col-sm-2">
        </div>
      </div>
    );
  }
}

export default HomeView;
