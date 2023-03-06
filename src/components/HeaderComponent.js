import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavItem, Nav, NavbarToggler, Collapse, Button, Modal, ModalHeader, ModalBody, Form, Label, FormGroup, Input } from 'reactstrap';
import './Header.css';
class Header extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isNavOpen: false,
      isModalOpen: false,
      modalName: ''
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSigup = this.handleSigup.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleModalHeader = this.handleModalHeader.bind(this);
    this.toggleModalName = this.toggleModalName.bind(this);
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

  toggleModalName (name) {
    this.setState({
      modalName: name
    });
  }

  handleModalHeader (e) {
    const name = e.target.id;
    this.toggleModal();
    this.toggleModalName(name);
  }

  handleLogin (event) {
    event.preventDefault();
    this.toggleModal();
    this.props.loginUser(this.username.value, this.password.value);
  }

  handleSigup (event) {
    event.preventDefault();
    this.toggleModal();
    this.props.signupUser(this.firstname.value, this.lastname.value, this.username.value, this.password.value);
  }

  handleLogout (event) {
    event.preventDefault();
    this.props.logoutUser();
    alert('you are logged out successfully!');
  }

  render () {
    return (
      <>
        <Navbar dark expand="md">
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className="mr-auto" href="/"><img src='/confusion/assets/images/logo.png' height="30" width="41" alt='Ristorante Con Fusion' /></NavbarBrand>
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
                {this.props.auth.isAuthenticated
                  ? <><NavItem>
                      <Button outline onClick={this.handleLogout} className=''>
                        <span className='fa fa-sign-in fa-lg'></span> Logout
                        {this.props.auth.isLoading
                          ? <span className='fa fa-spinner fa-pulse fa-fw' />
                          : null
                        }
                      </Button>
                    </NavItem>
                    <NavItem className='mx-1'>
                        <div className='navbar-brand text-muted'>{this.props.auth.user.username}</div>
                    </NavItem></>
                  : <><NavItem>
                    <Button name='Login' id='Login' outline onClick={this.handleModalHeader}>
                      <span id='Login' onClick={this.handleModalHeader} className='fa fa-sign-in fa-lg'></span> Login
                      {this.props.auth.isLoading && this.state.modalName === 'Login'
                        ? <span className='fa fa-spinner fa-pulse fa-fw' />
                        : null}
                    </Button>
                  </NavItem><NavItem>
                      <Button id='Signup' name='Signup' className='mx-3' outline onClick={this.handleModalHeader}>
                        <span id='Signup' className='fa fa-sign-in fa-lg'></span> Signup
                        {this.props.auth.isLoading && this.state.modalName === 'Signup'
                          ? <span className='fa fa-spinner fa-pulse fa-fw' />
                          : null}
                      </Button>
                    </NavItem></>
              }
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        <div className="jumbotron">
          <div className="container">
            <div className="row row-header">
              <h1>Ristorante ConFusion</h1>
              <p>
                We take inspiration from the Worlds best cuisines, and create a
                unique fusion experience. Our lipsmacking creations will tickle
                your culinary senses!
              </p>
            </div>
          </div>
        </div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>{this.state.modalName}</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.state.modalName === 'Login' ? this.handleLogin : this.handleSigup}>
              {
                this.state.modalName === 'Signup'
                  ? <><FormGroup>
                    <Label htmlFor='firstname'>Firstname</Label>
                    <Input type='text' placeholder='Firstname' id='firstname' name='firstname'
                      // eslint-disable-next-line no-return-assign
                      innerRef={(input) => this.firstname = input} />
                  </FormGroup><FormGroup>
                      <Label htmlFor='lastname'>Lastname</Label>
                      <Input type='text' placeholder='Lastname' id='lastname' name='lastname'
                        // eslint-disable-next-line no-return-assign
                        innerRef={(input) => this.lastname = input} />
                    </FormGroup></>
                  : null
              }
              <FormGroup>
                <Label htmlFor='userName'>Username</Label>
                <Input type='text' placeholder='Username' id='username' name='username'
                // eslint-disable-next-line no-return-assign
                innerRef={(input) => this.username = input}/>
              </FormGroup>
              <FormGroup>
                <Label htmlFor='password'>Password</Label>
                <Input type='password' placeholder='Password' id='password' name='password'
                // eslint-disable-next-line no-return-assign
                innerRef={(input) => this.password = input}/>
              </FormGroup>
              <FormGroup>
                <Label check>
                  <Input htmlFor='remember' type='checkbox' name='remember'
                  // eslint-disable-next-line no-return-assign
                  innerRef={(input) => this.remember = input}/> Remember me!
                </Label>
              </FormGroup>
              <Button type='submit' value='sumbit' color='primary'>{this.state.modalName}</Button>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}
export default Header;
