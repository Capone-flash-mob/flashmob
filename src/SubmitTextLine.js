import React from 'react';

class SubmitTextLine extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      instructions: props.instructions,
      label: props.label,
      value: props.value
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>{this.state.instructions}</p>
        <label>
          {this.state.label + ': '}
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default SubmitTextLine;
