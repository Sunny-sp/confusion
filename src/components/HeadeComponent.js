import React, { Component } from 'react'
import { Navbar, NavbarBrand } from 'reactstrap'
import './Header.css'
class Header extends Component {
  render () {
    return (
      <>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Risetorante con fusion</NavbarBrand>
          </div>
        </Navbar>
        <div className='jumbotron'>
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
    )
  }
}
export default Header
