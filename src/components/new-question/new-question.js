import React, { Component } from "react";
import { connect } from "react-redux";

import { handleAddQuestion } from "../../actions/questions";

import "./new-question.styles.scss";

class NewQuestion extends Component {
    state = {
        optionOne: "",
        optionTwo: "",
    };

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        const { optionOne, optionTwo } = this.state;
        const { authedUser, dispatch } = this.props;

        await dispatch(handleAddQuestion(optionOne, optionTwo, authedUser));

        this.setState({ OptionOne: "", optionTwo: "" });

        this.props.history.push("/");
    };

    render() {
        const { optionOne, optionTwo } = this.state;

        return (
            <div className="new-question">
                <h3>Create New Question</h3>
                <div className="form-container">
                    <p>Would you rather...</p>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            name="optionOne"
                            value={this.state.optionOne}
                            placeholder="Enter Option One Text Here"
                            onChange={this.handleChange}
                        />
                        <input
                            type="text"
                            name="optionTwo"
                            value={this.state.optionTwo}
                            placeholder="Enter Option Two Text Here"
                            onChange={this.handleChange}
                        />

                        <button
                            disabled={!(optionOne && optionTwo)}
                            className={
                                !(optionOne && optionTwo) ? "disabled" : ""
                            }
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser,
    };
}

export default connect(mapStateToProps)(NewQuestion);
