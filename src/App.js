import React, { Component } from 'react';
import fire from './fire';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
//////////////////////////////////////////////////////////////////////////////
// Regular Javascript Functions
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// Data
//////////////////////////////////////////////////////////////////////////////
function getData(config) {
  return {
    title: "Thriller",
    date: "10-2-2017",
    time: "3:00pm",
    location: "1350 Texas Dr",
    routineVideo: "https://youtu.be/dQw4w9WgXcQ",
    bannerImage: "https://dustn.tv/free-resources/social-covers/facebook-cover-photo-template.jpg",
    locationImg: "https://dustn.tv/free-resources/social-covers/facebook-cover-photo-template.jpg",
    sponser: "Oreos",
    adminID: "o438yt480ht48ty4o8gto84elgh8to4ht8o37ogf",
    contactEmail: "theflashmobsters@gmail.com",
    uid: "NOT_LOGGED_IN",
    peopleIntrested: 247,
    announcments: [
      {text:" Don't forget to wear yellow!", adminID:"o438yt480ht48ty4o8gto84elgh8to4ht8o37ogf", date:"10-3-2017"},
      {text:" Don't forget to wear black!", adminID:"o438yt480ht48ty4o8gto84elgh8to4ht8o37ogf", date:"10-1-2017"},
      {text:" Don't forget to wear maroon!", adminID:"o438yt480ht48ty4o8gto84elgh8to4ht8o37ogf", date:"10-9-2017"}
    ]
  }
}
//////////////////////////////////////////////////////////////////////////////
// Preprocessing of data
//////////////////////////////////////////////////////////////////////////////
var data = getData(1234)
//////////////////////////////////////////////////////////////////////////////
// Components - these are like C++ classes for HTML
//////////////////////////////////////////////////////////////////////////////
/*All new components must at least have this code*/
function ExampleProp(props){
  return (
      <div>

      </div>
    );
}
// Creates a headline banner with our logo and a login button
function Headline(props){
  return(
  <div className="App">
    <header className="App-header">
      <h1 className="App-title"> capone </h1>
      <span>Login</span>
    </header>
  </div>);
}
// Creates a basic form that lists contents when submit is clicked
class SubscriberForm extends Component{
  constructor(props) {
    super(props);
    this.state = { flashmobs: [] }; // <- set up react state
  }
  componentWillMount(){
    /* Create reference to messages in Firebase Database */
    let flashmobsRef = fire.database().ref('flashmobs').orderByKey().limitToLast(100);
    flashmobsRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let flashmob = { details: snapshot.val(), id: snapshot.key };
      this.setState({ flashmobs: [flashmob].concat(this.state.flashmobs) });
    })
  }
  addFlashmob(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    // Construct flashmob object
    var flashMobInstance =  {
        'name': this.name.value,
        'desc': this.desc.value,
        'loc': this.loc.value
        /* @TODO NEED TO ADD FULL SCHEMA HERE
          TAKEN FROM getData() FUNCTION ABOVE
        'name': this.name.value,
        'date': this.date.value,
        'time': this.time.value,
        'loc': this.loc.value,
        'video': this.video.value,
        'bannerImg': this.bannerImg.value,
        'locImg': this.locImg.value,
        // this may need some work. sponsor may not be needed, instead maybe
        // display admin name, admin email (ie: choreographer name and email)
        'sponsor': this.sponsor.value,  // not necessarily the choreographer
        'adminID': this.adminID.value,  // this is the choreographer
        'email': this.email.value,      // choreographer email, rename this for clarification
        'numInterested': 'this.numInterested.value',
        // not sure how this will work with several announcements
        'announcements': 'this.announements.value'
        // not sure that we need ot have 'uid' as part of the flashmob schema,
        // but do we need to include an 'eventID' or something of the sort?
      */
    };

    /* Send the message to Firebase */
    fire.database().ref('flashmobs').push(flashMobInstance);
    this.inputEl.value = ''; // <- clear the input
  }
    /* The form for submission should be placed on the admin edit page to create the flashmob
     * the rest should be displayed on the page for the specific flashmob. We'll need to work
     * out the routes for both of these ASAP so that we can separate the two
    */
    render(){
      return (
          <div>
            <form onSubmit={this.addFlashmob.bind(this)}>
              <input type="text" placeholder="Name" ref={ el => this.name = el }/>
              <input type="text" placeholder="Description" ref={ el => this.desc = el }/>
              <input type="text" placeholder="Location" ref={ el => this.loc = el }/>
              <input type="submit"/>
              <ul>
                { /* Render the list of messages */
                  this.state.flashmobs.map( flashmob => <li key={flashmob.id}>{flashmob.details.name}</li> )
                }
              </ul>
            </form>
          </div>
        );
    }
}
// Creates a page where users can view mob details
function MobPublicView(props){
  return(
    <div className="App">
      <img src={data["bannerImage"]}></img>
      <h1>{data.title}</h1>
      <div>
        <div>{data.time + " " + data.date}</div>
        <div>{data.location}</div>
        <div>
          <iframe width="420" height="345" src="https://www.youtube.com/embed/XGSy3_Czz8k">
          </iframe>
        </div>
        {data.peopleIntrested + " interested "}
        <input type="button"></input>
        <p> {data.announcments[0].text}</p>
      </div>
    </div>
    );
}
// Creates a page where an admin can view and edit mob details
function MobAdminView(props){
  return (
      <div>

      </div>
    );
}
//////////////////////////////////////////////////////////////////////////////
// Main - You should only write components, functions, or routes here
//////////////////////////////////////////////////////////////////////////////
class App extends Component {
  render() {
    return (
      //The Router component allows elements inside to use React-router's API
      <Router>
        <div>
          <Headline></Headline>
        {/*@TODO: Ask backend if we even need this, remove if not needed*/}
          {/*<SubscriberForm></SubscriberForm>*/}

          {/*Routes*/}
          {/*RR will display the component that has a matching path.
          Variables in the path start with a :colon and can be passed to the component.*/}
          {/*http://localhost:3000/public/mobID*/}
          <Route path="/public/:mob" component={MobPublicView}/>
          {/*@TODO: Convert Admin page into a react component */}
          <Route path="/admin/:mob" component={MobAdminView}/>
        </div>
      </Router>
    );
  }
}

export default App;
