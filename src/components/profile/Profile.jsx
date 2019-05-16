import React, { Component } from 'react';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      patients: [],
    }
  }
  render() {
    return(
      <section className="profile">
        <h1 className="uppercase">Profile view</h1>
      </section>
    );
  }
}

export default Profile;
