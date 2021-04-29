import { _getUsers } from "../utils/_DATA";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_ANSWER_TO_USER = "ADD_ANSWER_TO_USER";
export const ADD_USER_QUESTION = "ADD_USER_QUESTION";

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
    };
}

export const handleGetUsers = () => {
    return (dispatch) => {
        _getUsers().then((users) => dispatch(receiveUsers(users)));
    };
};

export function addAnswerToUser(authedUser, qid, answer) {
    return {
        type: ADD_ANSWER_TO_USER,
        authedUser,
        qid,
        answer,
    };
}

export function handleSaveUserAnswer(authedUser, qid, answer) {
    return (dispatch) => {
        dispatch(addAnswerToUser(authedUser, qid, answer));
    };
}

export function addUserQuestion(question) {
    return {
        type: ADD_USER_QUESTION,
        question,
    };
}

export function handleAddUserQuestion(question) {
    return (dispatch) => {
        dispatch(addUserQuestion(question));
    };
}
