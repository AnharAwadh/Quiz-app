import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage(props) {
  const [error, setError] = useState(false);
  const [loading, setLoding] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    props.setName("");
    props.setScore(0);
  }, []);

  const getQuestions = function () {
    setLoding(true);
    let url = "https://opentdb.com/api.php?amount=10";
    if (props.catagoryValue != 0) {
      url += `&category=${props.catagoryValue}`;
    }
    if (props.difficultyValue != "any") {
      url += `&difficulty=${props.difficultyValue}`;
    }
    if (props.typeValue != "any") {
      url += `&type=${props.typeValue}`;
    }
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setLoding(false);
        props.setQuestions(json.results);
        Navigate("/quiz");
      });
  };

  const categoryes = [
    { value: 0, label: "Any Category" },
    { value: 9, label: "General Knowledge" },
    { value: 10, label: "Entertainment: Books" },
    { value: 11, label: "Entertainment: Film" },
    { value: 12, label: "Entertainment: Music" },
    { value: 13, label: "Entertainment: Musicals &amp; Theatres" },
    { value: 14, label: "Entertainment: Television" },
    { value: 15, label: "Entertainment: Video Games" },
    { value: 16, label: "Entertainment: Board Games" },
    { value: 17, label: "Science & Nature" },
    { value: 18, label: "Science: Computers" },
    { value: 19, label: "Science: Mathematics" },
    { value: 20, label: "Mythology" },
    { value: 21, label: "Sports" },
    { value: 22, label: "Geography" },
    { value: 23, label: "History" },
    { value: 24, label: "Politics" },
    { value: 25, label: "Art" },
    { value: 26, label: "Celebrities" },
    { value: 27, label: "Animals" },
    { value: 28, label: "Vehicles" },
    { value: 29, label: "Entertainment: Comics" },
    { value: 30, label: "Science: Gadgets" },
    { value: 31, label: "Entertainment: Japanese Anime & Manga" },
    { value: 32, label: "Entertainment: Cartoon & Animations</option>" },
  ];
  const difficulty = [
    { value: "any", label: "Any Difficulty" },
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];
  const typeValue = [
    { value: "any", label: "Any Type" },
    { value: "multiple", label: "Multiple Choice" },
    { value: "boolean", label: "True / False" },
  ];
  return (
    <div className="content">
      <h2 className="title">Quiz App</h2>
      {error ? (
        <div className="alert alert-danger" role="alert">
          Please Fill All The Feilds
        </div>
      ) : (
        ""
      )}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Your Name"
          onChange={(event) => {
            props.setName(event.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <select
          className="form-select"
          value={props.catagoryValue}
          onChange={(event) => {
            props.setCatagoryValue(event.target.value);
          }}
        >
          {categoryes.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <select
          className="form-select"
          value={props.difficultyValue}
          onChange={(event) => {
            props.setDifficultyValue(event.target.value);
          }}
        >
          {difficulty.map((difficult) => (
            <option key={difficult.value} value={difficult.value}>
              {difficult.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <select
          className="form-select"
          onChange={(event) => {
            props.setTypeValue(event.target.value);
          }}
          value={props.typeValue}
        >
          {typeValue.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>
      {!loading ? (
        <button
          type="button"
          onClick={() => {
            props.name == ""
              ? setError(true)
              : (() => {
                  setError(false);
                  getQuestions();
                })();
          }}
          className="btn btn-dark"
        >
          START QUIZ
        </button>
      ) : (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
}
