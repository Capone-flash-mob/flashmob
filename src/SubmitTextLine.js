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
    this.state = {
      instructions: props.instructions,
      label: props.label,
      value: props.value,
      placeholder: props.placeholder,
      submitted: "btn btn-lg btn-block btn-primary",
      buttonText: "+",
      trigger: props.trigger, // callback which can passed in as an attribute
      flashmobId: props.flashmobId,
      feedbackUid: props.feedbackUid
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
    console.log('handling submit event***********');
    console.log('trigger is:', this.state.trigger);
    if(this.state.trigger == 'submitVideoURL'){
      console.log('submit video called');
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          var uname = user.displayName;
          var uuid = user.uid;
          var fmid = this.props.fmid;
          var vurl = this.state.value;
          console.log('SUBMITTING FEEDBACK NOW');
          database.submitFeedbackForFlashmob(fmid, uuid, uname, vurl);
        }
        this.setState({submitted: "btn btn-lg btn-block btn-success"});
      });
    }
    event.preventDefault();
    console.log('got here 1');
    console.log('got here 2');
    if(this.state.trigger === 'commentTrigger'){

      //yourfunctions();
      database.submitFeedbackComment(this.state.flashmobId, this.state.feedbackUid, this.state.value, this.props.reState);
      this.state.value = ''
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>{this.state.instructions}</p>
        <label forName="textLine">
          <i>{this.state.label + ''}</i>
        </label>
        <div class="input-group">
          <input name="textLine" class="form-control" type="text" placeholder={this.state.placeholder} value={this.state.value} onChange={this.handleChange} />
          <span class="input-group-btn">
            <input class="btn btn-success" type="submit" value={this.state.buttonText} />
          </span>
        </div>
      </form>
    );
  }
}
export default SubmitTextLine;
