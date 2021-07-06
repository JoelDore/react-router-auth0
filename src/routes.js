import React from "react";
import Component1 from "./components/Component1";
import Callback from "./components/Callback";
import ProtectedRoute from './components/ProtectedRoute'

import Container1 from "./containers/Container1";
import Header from "./containers/Header"
import history from "./utils/history";
import Auth from "./utils/auth";
import AuthCheck from './utils/authCheck'

import { Router, Route, Switch, Redirect } from "react-router"
import UnauthRedirect from "./components/UnauthRedirect";

const auth = new Auth()

const handleAuthentication = (props) => {
    if (props.location.hash) {
        auth.handleAuth()
    }
}

const PrivateRoute = ({component: Component, auth}) => (
    <Route render={props => auth.isAuthenticated() 
        ? <Component auth={auth} />
        : <Redirect to={{pathname:'/redirect'}} /> 
    } />
)

export default function Routes() {
    return (
        <div>
            <Router history={history}>
                <div>
                    <Header auth={auth} />
                    <Switch>
                        <Route exact path="/" render={() => <Container1 auth={auth} />} />
                        <Route path="/authcheck" render={() => <AuthCheck auth={auth} />} />
                        <Route path="/redirect" component={UnauthRedirect} />

                        <Route path="/callback" render={(props) => {
                            handleAuthentication(props);
                            return <Callback/>
                            }} />
                        <Route path="/component/:id" render={(props) => <Component1 {...props} />} />

                        <PrivateRoute path="/privateroute" auth={auth} component={ProtectedRoute} />
                        
                    </Switch>
                </div>
            </Router>
        </div>
    )
}
