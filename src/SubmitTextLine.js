import React from 'react';
import database from './database';
import firebase from 'firebase';

/* Usage:
  Add the text you want to substitute in as attributes of the Component's html ELEMENT.
  If you need a function, then define one inside an if statement in handleSubmit()
    Attributes:
    label - text to left of input box
    instructions - text above input box
    value - text inside input box
    trigger - something that you can check for with an if statement*/
class SubmitTextLine extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      instructions: props.instructions,
      label: props.label,
      value: "",
      submitted: "btn btn-lg btn-block btn-primary",
      buttonText: "Submit",
      trigger: props.trigger // callback which can passed in as an attribute
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    event.preventDefault();
  }

  // Add an if statement here for your trigger for custom onClick callback
  handleSubmit(event) {
    if(this.state.trigger == 'submitVideoURL'){
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          var uuid = user.uid;
          var fmid = this.props.fmid;
          var vurl = this.state.value;
          database.submitVideoURL(uuid,fmid,vurl);
        }
        this.setState({submitted: "btn btn-lg btn-block btn-success"});
    });


    event.preventDefault();
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>{this.state.instructions}</p>
        <label>
          {this.state.label + ': '}
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        {' '}
        <input className={this.state.submitted} type="submit" value={this.state.buttonText}/>
      </form>
    );
  }
}
export default SubmitTextLine;
