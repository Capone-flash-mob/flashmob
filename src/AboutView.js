import React from 'react';

// Creates a page where users can view information about the application
var AboutView = class AboutView extends React.Component {
  render() {
    return (
      <div class="content">
        <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
        <p> Howdy! </p>
        <p>Capone is web application that was built to help people oraganize
        flashmobs. Mob organizers or mobsters can create a page to display their
        flash mob. Dancers or other improvers can then sign up to a page.
        Once signed up through a Google account, users can submit YouTube video
        links to their mobster to get feedback on their moves. </p>

        <p> Capone was created in 2017 by a team of graduating compouter science
        students at Texas A&M University. The name is a shortened version of the
        famous mobster Al Capone.</p>
        </div>
        <div class="col-md-3"></div>
        </div>
      </div>
    );
  }
}

export default AboutView;
