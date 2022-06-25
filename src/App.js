import React from "react";
import "./App.css";
import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import QuizPage from "./pages/Quiz";
import ResultPage from "./pages/Result";
import NotFoundPage from "./pages/NotFound";

function App() {
  const [name, setName] = useState("");
  const [difficultyValue, setDifficultyValue] = useState("any");
  const [catagoryValue, setCatagoryValue] = useState(0);
  const [typeValue, setTypeValue] = useState("any");
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  return (
    <React.Fragment>
      <div className="bg-image"></div>;
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                name={name}
                setName={setName}
                setCatagoryValue={setCatagoryValue}
                catagoryValue={catagoryValue}
                setDifficultyValue={setDifficultyValue}
                difficultyValue={difficultyValue}
                setTypeValue={setTypeValue}
                typeValue={typeValue}
                setQuestions={setQuestions}
              />
            }
          />
          <Route
            path="/quiz"
            element={
              <QuizPage
                questions={questions}
                name={name}
                score={score}
                setScore={setScore}
              />
            }
          />
          <Route
            path="/resulte"
            element={<ResultPage name={name} score={score} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
