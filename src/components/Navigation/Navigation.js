import React, { Component } from 'react';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';

class Navigation extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { isAuthenticated } = this.props
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Villvay</Navbar.Brand>
          <Nav className="mr-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
          <Form inline>
            {isAuthenticated ? <Nav.Link href="/">Logout</Nav.Link> : <Nav.Link href="/signup">Sign up</Nav.Link>}
            <Nav.Link href="#">About</Nav.Link>
          </Form>
        </Navbar>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.isAuthenticated
  };
}
export default connect(mapStateToProps, null)(Navigation);
