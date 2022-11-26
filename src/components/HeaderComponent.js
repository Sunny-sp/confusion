import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavItem, Nav, NavbarToggler, Collapse, Button, Modal, ModalHeader, ModalBody, Form, Label, FormGroup, Input } from 'reactstrap';
import './Header.css';
class Header extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isNavOpen: false,
      isModalOpen: false
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  toggleNav () {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  toggleModal () {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleLogin (event) {
    this.toggleModal();
    alert(`UserName: ${this.userName.value} Password: ${this.password.value}
    remember me: ${this.remember.checked}`);
    event.preventDefault();
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
              <Nav className='ms-auto' Navbar>
                <NavItem>
                  <Button outline onClick={this.toggleModal}>
                    <span className='fa fa-sign-in fa-lg'></span> Login
                  </Button>
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
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor='userName'>UserName</Label>
                <Input type='text' placeholder='User Name' id='userName' name='userName'
                // eslint-disable-next-line no-return-assign
                innerRef={(input) => this.userName = input}/>
              </FormGroup>
              <FormGroup>
                <Label htmlFor='password'>Password</Label>
                <Input type='password' placeholder='Password' id='password' name='password'
                // eslint-disable-next-line no-return-assign
                innerRef={(input) => this.password = input}/>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input type='checkbox' name='remember'
                  // eslint-disable-next-line no-return-assign
                  innerRef={(input) => this.remember = input}/> Remember me!
                </Label>
              </FormGroup>
              <Button type='submit' value='sumbit' color='primary'>Login</Button>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}
export default Header;
