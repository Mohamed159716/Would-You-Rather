import React from "react";
import { connect } from "react-redux";

import "./leader-board.styles.scss";

const LeaderBoard = ({ leaderBoardSorted }) => {
    return (
        <div className="leader-board-container">
            {leaderBoardSorted.map((leader) => (
                <div key={leader.id} className="leader-box">
                    <div className="data-box">
                        <img src={leader.avatarURL} alt={leader.name} />
                        <span>{leader.name}</span>
                    </div>
                    <div className="info">
                        <div className="info-box">
                            <p>Answered Questions</p>
                            <p>{leader.totalAnswers}</p>
                        </div>
                        <div className="info-box">
                            <p>Created Questions</p>
                            <p>{leader.totalCreatedQuestions}</p>
                        </div>
                    </div>
                    <div className="scores">
                        <span className="score-header">Scores</span>
                        <span className="score-num">
                            {leader.totalQuestions}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

function mapStateToProps({ users }) {
    const leaderBoard = Object.keys(users).map((user) =>
        Object.assign({}, users[user], {
            totalCreatedQuestions: users[user].questions.length,
            totalAnswers: Object.keys(users[user].answers).length,
            totalQuestions:
                users[user].questions.length +
                Object.keys(users[user].answers).length,
        })
    );

    let leaderBoardSorted = Object.values(leaderBoard);

    leaderBoardSorted.sort((a, b) => b.totalQuestions - a.totalQuestions);

    return {
        leaderBoardSorted,
    };
}

export default connect(mapStateToProps)(LeaderBoard);
