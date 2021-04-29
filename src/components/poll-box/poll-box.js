import React from "react";
import { connect } from "react-redux";
import PollAnswer from "../poll-answer/poll-answer";
import PollResult from "./../poll-result/poll-result";

import "./poll-box.scss";

const PollBox = (props) => {
    const { currentUser } = props;
    const questionId = props.match.params.id;

    if (Object.keys(currentUser.answers).includes(questionId)) {
        return (
            <div className="poll-container">
                <PollResult questionId={questionId} />
            </div>
        );
    }

    return (
        <div className="poll-container">
            <PollAnswer questionId={questionId} />
        </div>
    );
};

function mapStateToProps({ users, authedUser }) {
    const currentUser = users[authedUser];

    return {
        currentUser,
    };
}

export default connect(mapStateToProps)(PollBox);
