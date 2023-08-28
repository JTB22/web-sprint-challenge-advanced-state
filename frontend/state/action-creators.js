// ❗ You don't need to add extra action creators to achieve MVP

import axios from "axios";

const getQuiz_URL = "http://localhost:9000/api/quiz/next";
const postAnswer_URL = "http://localhost:9000/api/quiz/answer";
const postQuiz_URL = "http://localhost:9000/api/quiz/new";

export function moveClockwise() {
  return {
    type: "MOVE_CLOCKWISE",
  };
}

export function moveCounterClockwise() {
  return {
    type: "MOVE_COUNTERCLOCKWISE",
  };
}

export function selectAnswer(id) {
  return {
    type: "SET_SELECTED_ANSWER",
    payload: id,
  };
}

export function setMessage(data) {
  return {
    type: "SET_INFO_MESSAGE",
    payload: data,
  };
}

export function setQuiz(data) {
  return {
    type: "SET_QUIZ_INTO_STATE",
    payload: data,
  };
}

export function inputChange(id, value) {
  return {
    type: "INPUT_CHANGE",
    payload: { id, value },
  };
}

export function resetForm() {
  return {
    type: "RESET_FORM",
  };
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    // dispatch(setQuiz(null));
    axios
      .get(getQuiz_URL)
      .then((res) => {
        dispatch(setQuiz(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function postAnswer(quiz_id, answer_id) {
  const answer = {
    quiz_id: quiz_id,
    answer_id: answer_id,
  };
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    axios
      .post(postAnswer_URL, answer)
      .then((res) => {
        dispatch(selectAnswer(null));
        dispatch(setMessage(res.data.message));
        dispatch(fetchQuiz());
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function postQuiz(formValues) {
  const quiz = {
    question_text: formValues.newQuestion,
    true_answer_text: formValues.newTrueAnswer,
    false_answer_text: formValues.newFalseAnswer,
  };
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    axios.post(postQuiz_URL, quiz).then((res) => {
      console.log(res);
      const message = `Congrats: "${res.data.question}" is a great question!`;
      dispatch(setMessage(message));
      dispatch(resetForm());
    });
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
