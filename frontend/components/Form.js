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

  const formValidation = () => {
    if (
      props.newQuestion.trim().length > 1 &&
      props.newTrueAnswer.trim().length > 1 &&
      props.newFalseAnswer.trim().length > 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={onChange}
        id="newQuestion"
        placeholder="Enter question"
        value={props.newQuestion}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
        value={props.newTrueAnswer}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
        value={props.newFalseAnswer}
      />
      <button
        id="submitNewQuizBtn"
        onClick={(e) => onSubmit(e)}
        {...(formValidation() ? null : { disabled: true })}
      >
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
