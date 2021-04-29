import React, { Component } from "react";
import { connect } from "react-redux";

import "./poll-answer.styles.scss";
import { handleSaveQuestionAnswer } from "./../../actions/questions";

class PollAnswer extends Component {
    state = {
        votes: "",
        option: "",
    };

    handleChange = (e) => {
        const value = e.target.value;
        const option = e.target.dataset.option;

        this.setState({ votes: value, option });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { authedUser, questionId } = this.props;
        const { option } = this.state;

        this.props.dispatch(
            handleSaveQuestionAnswer(authedUser, questionId, option)
        );
    };

    render() {
        const {
            questionUser: { name, avatarURL },
            currentQuestion: { optionOne, optionTwo },
        } = this.props;

        return (
            <div className="poll-answer">
                <img src={avatarURL} alt={name} />
                <span>{name}</span>
                <h4>Would you rather</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="radio-box">
                        <input
                            id="poll1"
                            type="radio"
                            name="votes"
                            value={optionOne.text}
                            onChange={this.handleChange}
                            data-option="optionOne"
                        />
                        <label htmlFor="poll1">{optionOne.text}</label>
                    </div>
                    <div className="radio-box">
                        <input
                            id="poll2"
                            type="radio"
                            name="votes"
                            value={optionTwo.text}
                            onChange={this.handleChange}
                            data-option="optionTwo"
                        />
                        <label htmlFor="poll2">{optionTwo.text}</label>
                    </div>
                    <button
                        disabled={this.state.votes === ""}
                        className={`btn-submit ${
                            this.state.votes === "" ? "disabled" : ""
                        }`}
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

function mapStateToProps({ users, authedUser, questions }, { questionId }) {
    const currentQuestion = questions[questionId];
    const questionUser = users[currentQuestion.author];

    return {
        authedUser,
        questionUser,
        currentQuestion,
    };
}

export default connect(mapStateToProps)(PollAnswer);
