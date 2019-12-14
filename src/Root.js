import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import { Helmet } from "react-helmet";
import Navigation from './components/Navigation/Navigation';
import { connect } from 'react-redux';



class Root extends Component {
    render() {
        const PrivateRoute = ({ component: Component, ...rest }) => {
            return (
                <Route {...rest} render={(props) => (
                    (this.props.isAuthenticated === true ? <Component {...props} /> : <Redirect to='/' />
                    )
                )} />
            );
        };
        return (
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Villvay POC</title>
                </Helmet>
                <Navigation history={this.props.history} />
                <Router>
                    <Route exact path='/' component={Login} />
                    <Route path='/signup' component={Signup} />
                    <PrivateRoute path='/home' component={Home} />
                </Router>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.user.isAuthenticated
    };
}
export default connect(mapStateToProps, null)(Root);
