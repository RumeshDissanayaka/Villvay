import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import routes from './routes/router';
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
                    <Switch>
                        {
                            routes.map((route) => (
                                route.path == '/home' ?
                                    <PrivateRoute
                                        exact
                                        key={route.path}
                                        path={route.path}
                                        component={route.component}
                                    /> :
                                        <Route
                                            exact
                                            key={route.path}
                                            path={route.path}
                                            component={route.component}
                                        /> 
                            ))
                        }
                    </Switch>
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
