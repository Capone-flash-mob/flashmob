import React, { Component } from 'react';
import database from './database'
import {BrowserRouter as Router, Route, Link, IndexRoute} from 'react-router-dom';
import firebase from 'firebase';

// Creates a page where users can register
var RegisterView = class RegisterView extends React.Component {
  componentDidMount() {
    var self = this;
  }

  handleLink(event) {
  }

  render() {
    var pointStyle = {
      cursor: 'pointer',
    }
    return(
      <div class="content">
        <form class="App-form" onSubmit={this.handleSubmit}>
          <div class="row">
            <div class="col-sm-5">
              <div>First Name:</div>
              <input class="input" placeholder="First Name" type="text" name="firstName"/>
            </div>
            <div class="col-sm-5">
              <div>Last Name:</div>
              <input class="input" placeholder="Last Name" type="text" name="lastName"/>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-10">
              <div>Password:</div>
              <input class="input" placeholder="Password" type="password" name="password"/>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-10">
              <div>Confirrm Password:</div>
              <input class="input" placeholder="Confirm Password" type="password" name="conPassword"/>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-10">
              <div>Email:</div>
              <input class="input" placeholder="Email" type="email" name="email"/>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterView;
