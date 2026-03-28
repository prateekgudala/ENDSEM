import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <h2>🎓 Course Planner</h2>
      <div>
        <Link to="/">Courses</Link>
        <Link to="/planner">Planner</Link>
        <Link to="/summary">Summary</Link>
      </div>
    </nav>
  );
}