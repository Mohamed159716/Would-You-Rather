import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./question.styles.scss";

const Question = ({
    question: { id, author, optionOne, optionTwo },
    users,
}) => {
    const { avatarURL, name } = users[author];

    return (
        <div className="question-info">
            <img src={avatarURL} alt={name} />
            <span>{name}</span>
            <h4>Would you rather</h4>
            <p>
                {optionOne.text} <br />
                ...
            </p>
            <Link to={`/questions/${id}`} className="poll-btn">
                View Poll
            </Link>
        </div>
    );
};

function mapStateToProps({ users }) {
    return {
        users,
    };
}

export default connect(mapStateToProps)(Question);
