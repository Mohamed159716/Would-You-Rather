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
import NotFound from "./components/notfound/notfound";
import Nav from "./components/nav/nav";
import NewQuestion from "./components/new-question/new-question";
import LeaderBoard from "./components/leader-board/leader-board";
import PollBox from "./components/poll-box/poll-box";

class App extends Component {
    state = {};

    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        {this.props.loading === true ? (
                            <React.Fragment>
                                <Nav />
                                <Route path="/add" component={NewQuestion} />
                                <Route
                                    path="/leaderboard"
                                    component={LeaderBoard}
                                />
                                <Route
                                    path="/questions/:id"
                                    component={PollBox}
                                />
                                <Route path="/" exact component={Home} />
                            </React.Fragment>
                        ) : (
                            <Route path="/" exact component={Login} />
                        )}

                        <Route path="/notfound" component={NotFound} />
                        <Redirect to="/notfound" />
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
