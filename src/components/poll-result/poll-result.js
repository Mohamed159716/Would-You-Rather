import React from "react";
import { connect } from "react-redux";

import "./poll-result.styles.scss";

const PollResult = ({
    authedUser,
    questionUser: { name, avatarURL },
    currentQuestion: { optionOne, optionTwo },
}) => {
    const totalVotes = optionOne.votes.length + optionTwo.votes.length;

    const optionOneVote = optionOne.votes.includes(authedUser);
    const optionTwoVote = optionTwo.votes.includes(authedUser);

    const optionOnePercentage = Math.round(
        (100 / totalVotes) * optionOne.votes.length
    );
    const optionTwoPercentage = Math.round(
        (100 / totalVotes) * optionTwo.votes.length
    );

    return (
        <div className="poll-result">
            <img src={avatarURL} alt={name} />
            <span>{name}</span>
            <h4>Result</h4>

            <div className="votes">
                <div className="vote">
                    <p className="would-you-rather">
                        Would you rather {optionOne.text}
                    </p>
                    <div className="progress-container">
                        <span style={{ width: optionOnePercentage + "%" }}>
                            {optionOnePercentage + "%"}
                        </span>
                    </div>
                    <p>
                        {optionOne.votes.length} out of {totalVotes}
                    </p>
                    <span
                        className={`your-vote ${optionOneVote ? "" : "hidden"}`}
                    >
                        Your vote
                    </span>
                </div>

                <div className="vote">
                    <p className="would-you-rather">
                        Would you rather {optionOne.text}
                    </p>
                    <div className="progress-container">
                        <span style={{ width: optionTwoPercentage + "%" }}>
                            {optionTwoPercentage + "%"}
                        </span>
                    </div>
                    <p>
                        {optionTwo.votes.length} out of {totalVotes}
                    </p>
                    <span
                        className={`your-vote ${optionTwoVote ? "" : "hidden"}`}
                    >
                        Your vote
                    </span>
                </div>
            </div>
        </div>
    );
};

function mapStateToProps({ users, authedUser, questions }, { questionId }) {
    const currentQuestion = questions[questionId];
    const questionUser = users[currentQuestion.author];

    return {
        authedUser,
        questionUser,
        currentQuestion,
    };
}

export default connect(mapStateToProps)(PollResult);
