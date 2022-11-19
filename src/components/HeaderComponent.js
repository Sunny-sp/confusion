import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavItem, Nav, NavbarToggler, Collapse } from 'reactstrap';
import './Header.css';
class Header extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isNavOpen: false
    };
    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav () {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  render () {
    return (
      <>
       <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/"><img src='assets/images/logo.png' height="30" width="41" alt='Ristorante Con Fusion' /></NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                            <NavItem>
                                <Link className="nav-link" to='/home'><span className="fa fa-home fa-lg"></span> Home</Link>
                            </NavItem>
                            <NavItem>
                                <Link className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"></span> About Us</Link>
                            </NavItem>
                            <NavItem>
                                <Link className="nav-link" to='/menu'><span className="fa fa-list fa-lg"></span> Menu</Link>
                            </NavItem>
                            <NavItem>
                                <Link className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</Link>
                            </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
        <div className="jumbotron">
          <div className="container">
            <div className="row row-header">
              <h1>Ristorante con Fusion</h1>
              <p>
                We take inspiration from the Worlds best cuisines, and create a
                unique fusion experience. Our lipsmacking creations will tickle
                your culinary senses!
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Header;
