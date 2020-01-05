import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import routes from './routes/router';
import { Helmet } from "react-helmet";
import Navigation from './components/Navigation/Navigation';
import { connect } from 'react-redux';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import ErrorPage from './components/Error/ErrorPage';
import PaginationDemo from './components/Pagination/Pagination'
import { store } from './index'



export default function Root() {
    return (
        <div>   <Helmet>
            <meta charSet="utf-8" />
            <title>Villvay POC</title>
        </Helmet>
            <Switch>
                <Route component={Login} path="/" exact />
                <Route component={Signup} path="/signup" exact />
                <Route component={PaginationDemo} path="/pagination" exact />
                <PrivateRoute component={Home} path="/home" exact />
                <Route component={ErrorPage} path="*" exact />
            </Switch>
        </div>
    );
}



const PrivateRoute = ({ component: Component, ...rest }) => {
    let state = store.getState()
    return (
        <Route {...rest} render={(props) => (
            (state.user.isAuthenticated === true ? <Component {...props} /> : <Redirect to='/' />
            )
        )} />
    );
};

