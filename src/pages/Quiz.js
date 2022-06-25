import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const getAnswers = function (question) {
  const answers = question["correct_answer"];
  const incorrect = question["incorrect_answers"];
  return [answers, ...incorrect].sort((a, b) => 0.5 - Math.random());
};
export default function QuizPage(props) {
  const Navigate = useNavigate();

  const [questionNumber, setQuestionNumber] = useState(0);
  const [current, setCurrent] = useState(props.questions[questionNumber]);
  const [answerIsSelected, setAnswerIsSelected] = useState(false);
  const [answerSelected, setAnswerSelected] = useState(null);

  const [answers, setAnswers] = useState(() => {
    const answers = current["correct_answer"];
    const incorrect = current["incorrect_answers"];
    return [answers, ...incorrect].sort((a, b) => 0.5 - Math.random());
  });

  const renderButton = function (ans) {
    if (answerIsSelected) {
      if (ans == current["correct_answer"]) {
        return (
          <button
            key={ans}
            className="btn btn-success"
            dangerouslySetInnerHTML={{ __html: ans }}
          ></button>
        );
      } else if (answerSelected == ans && ans != current["correct_answer"]) {
        return (
          <button
            key={ans}
            className="btn btn-danger"
            dangerouslySetInnerHTML={{ __html: ans }}
          ></button>
        );
      } else {
        return (
          <button
            key={ans}
            className="btn btn-light"
            dangerouslySetInnerHTML={{ __html: ans }}
          ></button>
        );
      }
    } else {
      return (
        <button
          key={ans}
          onClick={() => selectedAnswer(ans)}
          className="btn btn-light"
          dangerouslySetInnerHTML={{ __html: ans }}
        ></button>
      );
    }
  };
  const selectedAnswer = function (answer) {
    setAnswerIsSelected(true);
    setAnswerSelected(answer);
    if (answer == current["correct_answer"]) {
      props.setScore(props.score + 1);
    }
  };
  const goToNext = function () {
    setQuestionNumber(questionNumber + 1);
    setCurrent(props.questions[questionNumber]);
    setAnswers(getAnswers(props.questions[questionNumber]));
    setAnswerIsSelected(false);
  };
  const showResult = function () {
    Navigate("/resulte");
  };
  const goToHome = function () {
    Swal.fire({
      title: "Are you sure?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Navigate("/");
      }
    });
  };
  return (
    <div className="content">
      <div className="row">
        <div className="col-md-6">
          <h4 style={{ textAlign: "left" }}>Welcome, {props.name}</h4>
        </div>
        <div className="col-md-6">
          <h4 style={{ textAlign: "right", marginRight: "12px" }}>
            score: {props.score}
          </h4>
        </div>
      </div>
      <div>
        <p
          style={{ textAlign: "left" }}
          dangerouslySetInnerHTML={{ __html: current.question }}
        ></p>
      </div>
      <div className="d-grid gap-2">
        {answers.map((ans) => renderButton(ans))}
      </div>
      <div className="row" style={{ "margin-top": "12px" }}>
        {answerIsSelected && props.questions.length > questionNumber ? (
          <React.Fragment>
            <button
              onClick={() => goToHome()}
              className="btn btn-danger col-md-6"
            >
              Quit
            </button>
            <button
              onClick={() => goToNext()}
              className="btn btn-light col-md-6"
            >
              Next
            </button>
          </React.Fragment>
        ) : props.questions.length == questionNumber && answerIsSelected ? (
          <React.Fragment>
            <button
              onClick={() => goToHome()}
              className="btn btn-danger col-md-6"
            >
              Quit
            </button>
            <button
              onClick={() => showResult()}
              className="btn btn-success col-md-6"
            >
              Show Result
            </button>
          </React.Fragment>
        ) : (
          <button
            onClick={() => goToHome()}
            className="btn btn-danger col-md-12"
          >
            Quit
          </button>
        )}
      </div>
    </div>
  );
}
