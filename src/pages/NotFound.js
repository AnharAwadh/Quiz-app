import { useNavigate } from "react-router-dom";

export default function NotFoundPage(props) {
  const Navigate = useNavigate();

  return (
    <div className="content">
      <h1>Not Found Page</h1>
      <button className="btn btn-light" onClick={() => Navigate("/")}>
        Go To Home Page
      </button>
    </div>
  );
}
