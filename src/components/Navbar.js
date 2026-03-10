import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src="/images/galgotias-logo.png" alt="GU" />
        <h3>Galgotias EMS</h3>
      </div>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/my-events">My Events</Link>
        {role === "ADMIN" && <Link to="/admin">Admin</Link>}
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}
