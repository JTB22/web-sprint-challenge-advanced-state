import React from "react";
import { connect } from "react-redux";
import { postQuiz, inputChange } from "../state/action-creators";

export function Form(props) {
  const onChange = (evt) => {
    props.inputChange(evt.target.id, evt.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    props.postQuiz(props);
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={onChange}
        id="newQuestion"
        placeholder="Enter question"
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
      />
      <button id="submitNewQuizBtn" onClick={(e) => onSubmit(e)}>
        Submit new quiz
      </button>
    </form>
  );
}

const mapStateToProps = (st) => {
  return {
    newQuestion: st.form.newQuestion,
    newTrueAnswer: st.form.newTrueAnswer,
    newFalseAnswer: st.form.newFalseAnswer,
  };
};

export default connect(mapStateToProps, { postQuiz, inputChange })(Form);
