import React, { Component } from "react";
import { connect } from "react-redux";
import { BiDownArrow } from "react-icons/bi";

import preferences from "../../preferences.svg";

import "./login.styles.scss";
import { handleSetAuthedUser } from "./../../actions/authedUser";

class Login extends Component {
    state = {
        active: true,
        userId: null,
        name: null,
        avatar: null,
        alt: null,
    };

    toggleClass = () => {
        let { active } = this.state;

        this.setState({ active: !active });
    };

    selectedUser = (userId, name, avatar) => {
        this.setState({ userId, name, avatar, alt: name });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { userId } = this.state;
        this.props.dispatch(handleSetAuthedUser(userId));

        this.props.history.push("/");
    };

    render() {
        const { active, name, avatar, alt } = this.state;
        const { users } = this.props;

        return (
            <div className="container">
                <h2>Welcome to the Would You Rather App!</h2>
                <img
                    src={preferences}
                    alt="preferences"
                    className="preferences"
                />
                <form className="form-container" onSubmit={this.handleSubmit}>
                    <div className="select-user-box" onClick={this.toggleClass}>
                        <div className="selected-user">
                            <div className="user-info">
                                {name !== null ? (
                                    <React.Fragment>
                                        <img src={avatar} alt={alt} />
                                        <span>{name}</span>
                                    </React.Fragment>
                                ) : (
                                    <span>Select the User</span>
                                )}
                            </div>
                            <BiDownArrow className="down-arrow" />
                        </div>

                        <div
                            className={`user-login-box ${
                                active ? "active" : ""
                            }`}
                        >
                            {Object.keys(users).map((user) => (
                                <div
                                    className="user-login"
                                    onClick={() =>
                                        this.selectedUser(
                                            users[user].id,
                                            users[user].name,
                                            users[user].avatarURL
                                        )
                                    }
                                    key={users[user].id}
                                >
                                    <img
                                        src={users[user].avatarURL}
                                        alt={users[user].name}
                                    />
                                    <span>{users[user].name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        disabled={name === null}
                        className={`login-btn ${name ? "" : "disabled"}`}
                    >
                        Login
                    </button>
                </form>
            </div>
        );
    }
}

function mapStateToProps({ users }) {
    return {
        users,
    };
}

export default connect(mapStateToProps)(Login);
