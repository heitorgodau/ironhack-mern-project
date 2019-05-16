import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBCollapse, MDBContainer, MDBHamburgerToggler } from 'mdbreact';

class NavbarPage extends Component {
  constructor() {
    super();
    this.state = {
      collapse1: false,
    }
  }

render() {
  return (
    <h2>NavBar</h2>
    );
  }
}

export default NavbarPage;