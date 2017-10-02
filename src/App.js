import React, { Component } from 'react';
import fire from './fire';
import logo from './logo.svg';
import './App.css';

class App extends Component {
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
    };
    
    /* Send the message to Firebase */
    fire.database().ref('flashmobs').push(flashMobInstance);
    this.inputEl.value = ''; // <- clear the input
  }
  render() {
    return (
      <form onSubmit={this.addFlashmob.bind(this)}>
        <input type="text" ref={ el => this.name = el }/>
        <input type="text" ref={ el => this.desc = el }/>
        <input type="text" ref={ el => this.loc = el }/>
        <input type="submit"/>
        <ul>
          { /* Render the list of messages */
            this.state.flashmobs.map( flashmob => <li key={flashmob.id}>{flashmob.details.name}</li> )
          }
        </ul>
      </form>
    );
  }
}

export default App;
