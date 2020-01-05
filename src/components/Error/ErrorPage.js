import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorPage extends Component {
  render() {
    return (
      <div>
        <h3>Page Not Found</h3>
        <Link to="/">Return to Home Page</Link>
      </div>
    );
  }
}

export default ErrorPage;