import { useNavigate } from "react-router-dom";

export default function ResultPage(props) {
  const Navigate = useNavigate();

  return (
    <div className="content">
      <h1>{props.name}</h1>
      <h2>Your score is: {props.score}</h2>
      <button className="btn btn-light" onClick={() => Navigate("/")}>
        Go To Home Page
      </button>
    </div>
  );
}
