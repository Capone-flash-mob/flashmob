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
    this.editHometown = this.editHometown.bind(this);
    this.editBirthdate = this.editBirthdate.bind(this);
    this.saveHometown = this.saveHometown.bind(this);
    this.saveBirthdate = this.saveBirthdate.bind(this);
    this.saveGender = this.saveGender.bind(this);
    this.editGender = this.editGender.bind(this);
    this.setState({
      editHometown: false,
      editBirthdate: false,
      editGender: false,
    })
  }

  componentDidMount() {

    var self = this;
    var userID = this.props.match.params.userid

    firebase.auth().onAuthStateChanged(function(user) {
      if(user){
        var myUser = database.getUser(user.uid, function(customUser){
            database.getMyFlashMobs(userID, function(flashmobs){
              self.setState({
             myMobs: flashmobs,
             authenticated: 'true',
             currentUser: customUser,
           });
       });
        })
      }
      else {
        self.setState({
          authenticated: 'false',
        })
      }
    })

    
  }

  handleLink(event){
      event.preventDefault(); // <- prevent form submit from reloading the page*/
    console.log("clicked" + event.target.id);
    this.props.history.push("/mob/" + event.target.id);
  }

  editHometown(event){
    this.setState({
      editHometown: true,
    })
  }

  editBirthdate(event){
    this.setState({
      editBirthdate: true,
    })
  }

  editGender(event){
    this.setState({
      editGender: true,
    })
  }

  saveHometown(event){
    var hometown = document.getElementById("hometownId").value;
      if(hometown!=""){
      console.log("USERNAMAMAMAMMA:" + hometown);
      var self = this;
      database.addUserField(this.state.currentUser, "Hometown", hometown, function(updatedUser){
        console.log("NNEEWWW HOMETOWN: " + updatedUser.Hometown);
        self.setState({
        currentUser: updatedUser,
        editHometown: false,
        })
      });
    } else {
      this.setState({
        editHometown: false,
      })
    }
  }

  saveBirthdate(event){
    event.preventDefault();
    var birthdate = document.getElementById("birthdateId").value;
      if(birthdate!=""){
      var self= this;
      database.addUserField(this.state.currentUser, "Birthdate", birthdate, function(updatedUser){
        self.setState({
          currentUser: updatedUser,
          editBirthdate: false,
        })
      });
    } else {
      this.setState({
        editBirthdate: false,
      })
    }
  }

  saveGender(event){
    var gender = document.getElementById("genderId").value;
      if(gender!=""){
      var self= this;
      database.addUserField(this.state.currentUser, "Gender", gender, function(updatedUser){
        self.setState({
          currentUser: updatedUser,
          editGender: false,
        })
      });
    } else {
      this.setState({
        editGender: false,
      })
    }
  }

  render(){
    if(this.state == null){
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

    //const feedbackList = this;


    if(this.state.currentUser == undefined){
          return (<div>Please Sign in to View a User Page</div>);
    }
    const opts = {
        height: '200',
        width: '100%',
      };

    return(

      <div class="content">

    {/*Render the different user information based on what is available*/}
        <div class="row">
          <div class="col-sm-1 offset-sm-2"> Name: </div>
          <div class="col-sm-1"></div>
          <div class="col-sm-2 offset-sm-4">{this.state.currentUser.Name}</div>
        </div>

        <div class="col-sm-8 offset-sm-2">
        <hr/>
        </div>

        <div class="row">
          <div class="col-sm-1 offset-sm-2"> Email: </div>
          <div class="col-sm-1"></div>
          <div class="col-sm-2 offset-sm-4"> {this.state.currentUser.Email} </div>
        </div>

       <div class="col-sm-8 offset-sm-2">
        <hr/>
        </div>


          <div>

          {
          (this.state.currentUser.Birthdate!=="")
            ? ((this.state.editBirthdate !== true)
                ?
                <div class="row">
                    <div class="col-sm-1 offset-sm-2"> Birthdate: </div>
                    <div class="col-sm-1">
                    <button onClick={this.editBirthdate}> Edit </button>
                    </div>
                    <div class = "col-sm-2 offset-sm-4">{this.state.currentUser.Birthdate}</div>
                  </div>
                :
                 <div class="row">
                    <div class="col-sm-1 offset-sm-2"> Birthdate: </div>
                    <div class="col-sm-1">
                    <button onClick={this.saveBirthdate}> Save </button>
                    </div>
                    <input id="birthdateId" type="date" class = "col-sm-1 offset-sm-4"></input>
                  </div>
             )
            :
              ((this.state.editBirthdate !== true)
                    ?
                  <div class="row">
                      <div class="col-sm-2 offset-sm-2"> Birthdate: </div>
                      <div class="col-sm-1">
                      <button onClick={this.editBirthdate}> Edit </button>
                      </div>
                      <div class = "col-sm-1 offset-sm-4">Unknown</div>
                    </div>
                  : <div class="row">
                      <div class="col-sm-1 offset-sm-2"> Birthdate: </div>
                      <div class="col-sm-1">
                      <button onClick={this.saveBirthdate}> Save </button>
                      </div>
                      <input type="date" id="birthdateId" placehold={this.state.currentUser.Birthdate} class = "col-sm-1 offset-sm-4"></input>
                    </div>
                )
          }
        </div>



        <div class="col-sm-8 offset-sm-2">
        <hr/>
        </div>


         <div>
          {
          (this.state.currentUser.Hometown!=="")
            ? ((this.state.editHometown !== true)
                ?
                <div class="row">
                    <div class="col-sm-1 offset-sm-2"> Hometown: </div>
                    <div class="col-sm-1">
                    <button onClick={this.editHometown}> Edit </button>
                    </div>
                    <div class = "col-sm-2 offset-sm-4">{this.state.currentUser.Hometown}</div>
                  </div>
                : <div class="row">
                    <div class="col-sm-1 offset-sm-2"> Hometown: </div>
                    <div class="col-sm-1">
                    <button onClick={this.saveHometown}> Save </button>
                    </div>
                    <input type="text" id="hometownId" class = "col-sm-1 offset-sm-4"></input>
                  </div>
             )
            :
               ((this.state.editHometown !== true)
                  ?
                <div class="row">
                    <div class="col-sm-1 offset-sm-2"> Hometown: </div>
                    <div class="col-sm-1">
                    <button onClick={this.editHometown}> Edit </button>
                    </div>
                    <div class = "col-sm-1 offset-sm-4">Unknown</div>
                  </div>
                : <div class="row">
                    <div class="col-sm-1 offset-sm-2"> Hometown: </div>
                    <div class="col-sm-1">
                    <button onClick={this.saveHometown}> Save </button>
                    </div>
                    <input id="hometownId" type="text" placehold={this.state.currentUser.Hometown} class = "col-sm-1 offset-sm-4"></input>
                  </div>
              )
          }
        </div>

        <div class="col-sm-8 offset-sm-2">
        <hr/>
        </div>

        <div>
          {
          (this.state.currentUser.Gender!=="")
            ? ((this.state.editGender !== true)
                ?
                <div class="row">
                    <div class="col-sm-1 offset-sm-2"> Gender: </div>
                    <div class="col-sm-1">
                    <button onClick={this.editGender}> Edit </button>
                    </div>
                    <div class = "col-sm-2 offset-sm-4">{this.state.currentUser.Gender}</div>
                  </div>
                : <div class="row">
                    <div class="col-sm-1 offset-sm-2"> Gender: </div>
                    <div class="col-sm-1">
                    <button onClick={this.saveGender}> Save </button>
                    </div>
                    <select id="genderId" class = "col-sm-1 offset-sm-4">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other?">Other?</option>
                      </select>
                  </div>
             )
            :
               ((this.state.editGender !== true)
                  ?
                <div class="row">
                    <div class="col-sm-1 offset-sm-2"> Gender: </div>
                    <div class="col-sm-1">
                    <button onClick={this.editGender}> Edit </button>
                    </div>
                    <div class = "col-sm-1 offset-sm-4">Unknown</div>
                  </div>
                : <div class="row">
                    <div class="col-sm-1 offset-sm-2"> Gender: </div>
                    <div class="col-sm-1">
                    <button onClick={this.saveGender}> Save </button>
                    </div>
                    <select id="genderId" class = "col-sm-1 offset-sm-4">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other?</option>
                    </select>
                  </div>
              )
          }
        </div>




          <div class="col-sm-8 offset-sm-2">
          <hr/>
          <div class = "col-sm-4 offset-sm-5">MyFlashmobs</div>
            <div class="row">

              {(flashList!==undefined) ?
              flashList.map((key, index) =>
                <div class="col-sm-4">
                  <Link to={"/mob/" + key.key} style={{ textDecoration: 'none'}}>
                    <div class="mob-infobox">
                      <YouTube
                        opts={opts}
                        videoId={key.videos[0].id}
                      />
                      <div class="mob-infobox-details">
                        <span class="mob-infobox-title"> {key.name} </span>
                        <span class="mob-infobox-location"> {key.location} </span>
                        <span class="mob-infobox-date-and-time"> {key.date}, {key.time} </span>
                      </div>
                    </div>
                  </Link>
                </div>
              )

            :
            <div class="row">
            <div class="col-sm-12 offset-sm-5">You don't seem to be interested in any flashmobs at the moment</div>
            </div>
          }


            </div>
          </div>
        </div>
    );
  }
}

export default UserView;
