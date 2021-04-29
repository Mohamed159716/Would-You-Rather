import { saveQuestionAnswer, saveQuestion } from "./../utils/api";
import { handleSaveUserAnswer, handleAddUserQuestion } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const SAVE_QUESTION_ANSWER = "SAVE_QUESTION_ANSWER";
export const ADD_QUESTION = "ADD_QUESTION";

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    };
}

export function questionAnswer(authedUser, qid, answer) {
    return {
        type: SAVE_QUESTION_ANSWER,
        authedUser,
        qid,
        answer,
    };
}

export function handleSaveQuestionAnswer(authedUser, qid, answer) {
    return (dispatch) => {
        return saveQuestionAnswer({
            authedUser,
            qid,
            answer,
        }).then(({ authedUser, qid, answer }) => {
            console.log("handleSaveQuestion");
            console.log(answer);
            dispatch(questionAnswer(authedUser, qid, answer));
            dispatch(handleSaveUserAnswer(authedUser, qid, answer));
        });
    };
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,
    };
}

export function handleAddQuestion(optionOneText, optionTwoText, author) {
    return (dispatch) => {
        return saveQuestion({ optionOneText, optionTwoText, author }).then(
            (question) => {
                dispatch(addQuestion(question));
                dispatch(handleAddUserQuestion(question));
            }
        );
    };
}
