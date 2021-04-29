import React, { Component } from "react";
import { connect } from "react-redux";

import Question from "../question/question";

import "./home.styles.scss";

class Home extends Component {
    state = {
        questions: [],
        type: "",
    };

    componentDidMount() {
        const { unansweredQuestions } = this.props;
        this.setState({ questions: unansweredQuestions, type: "unanswered" });
    }

    handleQuestions = (questions, type) => {
        this.setState({ questions, type });
    };

    render() {
        const { answeredQuestions, unansweredQuestions } = this.props;
        const filteredQuestions = this.state.questions;

        return (
            <div className="home-container">
                <div className="btn-box">
                    <button
                        className={`${
                            this.state.type === "unanswered" ? "active" : ""
                        }`}
                        onClick={() =>
                            this.handleQuestions(
                                unansweredQuestions,
                                "unanswered"
                            )
                        }
                    >
                        Unanswered Questions
                    </button>
                    <button
                        className={`${
                            this.state.type === "answered" ? "active" : ""
                        }`}
                        onClick={() =>
                            this.handleQuestions(answeredQuestions, "answered")
                        }
                    >
                        Answered Questions
                    </button>
                </div>

                <div className="question-result">
                    {filteredQuestions.map((question) => (
                        <Question key={question.id} question={question} />
                    ))}
                </div>
            </div>
        );
    }
}

function mapStateToProps({ questions, users, authedUser }) {
    const currentUser = users[authedUser];
    const questionIds = Object.keys(questions).sort(
        (a, b) => questions[b].timestamp - questions[a].timestamp
    );

    let answeredQuestions = [];
    let unansweredQuestions = [];

    questionIds.map((question) =>
        Object.keys(currentUser.answers).includes(question)
            ? answeredQuestions.push(questions[question])
            : unansweredQuestions.push(questions[question])
    );

    return {
        answeredQuestions,
        unansweredQuestions,
    };
}

export default connect(mapStateToProps)(Home);
