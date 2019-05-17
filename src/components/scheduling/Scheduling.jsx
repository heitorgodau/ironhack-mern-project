import React, { Component } from 'react';

class Scheduling extends Component {
  constructor() {
    super();
    this.state = {
      patients: [],
    }
  }
  render() {
    return(
      <section className="profile">
        <h1 className="uppercase">Scheduling view</h1>
      </section>
    );
  }
}

export default Scheduling;