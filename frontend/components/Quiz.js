import React from "react";
import { connect } from "react-redux";
import { setQuiz, fetchQuiz, selectAnswer } from "../state/action-creators";

function Quiz(props) {
  if (!props.quiz) {
    props.fetchQuiz();
  }
  const isSelected = (id) => {
    if (props.selected === id) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              <div
                className={
                  isSelected(props.quiz.answers[0].answer_id)
                    ? "answer selected"
                    : "answer"
                }
              >
                {props.quiz.answers[0].text}
                <button
                  onClick={() =>
                    props.selectAnswer(props.quiz.answers[0].answer_id)
                  }
                >
                  {isSelected(props.quiz.answers[0].answer_id)
                    ? "SELECTED"
                    : "Select"}
                </button>
              </div>

              <div
                className={
                  isSelected(props.quiz.answers[1].answer_id)
                    ? "answer selected"
                    : "answer"
                }
              >
                {props.quiz.answers[1].text}
                <button
                  onClick={() =>
                    props.selectAnswer(props.quiz.answers[1].answer_id)
                  }
                >
                  {isSelected(props.quiz.answers[1].answer_id)
                    ? "SELECTED"
                    : "Select"}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" onClick={() => props.setQuiz(null)}>
              Submit answer
            </button>
          </>
        ) : (
          "Loading next quiz..."
        )
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz,
    selected: state.selectedAnswer,
  };
};

export default connect(mapStateToProps, { setQuiz, fetchQuiz, selectAnswer })(
  Quiz
);
