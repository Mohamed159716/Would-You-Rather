import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { AiOutlineLogout } from "react-icons/ai";

import "./nav.styles.scss";
import { removeAuthedUser } from "./../../actions/authedUser";

class Nav extends Component {
    state = {};

    logout = () => {
        this.props.dispatch(removeAuthedUser());

        this.props.history.replace("/");
    };

    render() {
        const {
            currentUser: { name, avatarURL },
        } = this.props;
        return (
            <nav>
                <div className="nav-container">
                    <ul>
                        <li>
                            <NavLink to="/" exact activeClassName="active">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/add" activeClassName="active">
                                New Question
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/leaderboard" activeClassName="active">
                                Leader Board
                            </NavLink>
                        </li>
                    </ul>
                    <div className="data-box">
                        <span>{name}</span>
                        <img src={avatarURL} alt={name} />
                        <div className="logout-box" onClick={this.logout}>
                            <AiOutlineLogout className="logout" />
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ users, authedUser }) {
    const currentUser = users[authedUser];
    return {
        currentUser,
    };
}

export default withRouter(connect(mapStateToProps)(Nav));
