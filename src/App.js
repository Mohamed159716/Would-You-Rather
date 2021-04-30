import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import Login from "./components/login/login";
import { handleInitialData } from "./actions/shared";
import Home from "./components/home/home";
import Nav from "./components/nav/nav";
import NewQuestion from "./components/new-question/new-question";
import LeaderBoard from "./components/leader-board/leader-board";
import PollBox from "./components/poll-box/poll-box";
import PrivateRoute from "./components/private-route/private-route";
import NotFound from "./components/notfound/notfound";

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        return (
            <div>
                <Router>
                    <Nav loading={this.props.loading} />
                    <Switch>
                        <Route path="/login" exact component={Login} />

                        <PrivateRoute path="/add" component={NewQuestion} />
                        <PrivateRoute
                            path="/leaderboard"
                            component={LeaderBoard}
                        />
                        <PrivateRoute path="/home" exact component={Home} />
                        <PrivateRoute
                            path="/questions/:id"
                            exact
                            component={PollBox}
                        />
                        <Redirect exact from="/" to="/home" />
                        <PrivateRoute path="*" component={NotFound} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

function mapStateToProps({ authedUser }) {
    return {
        loading: authedUser !== null,
    };
}

export default connect(mapStateToProps)(App);
