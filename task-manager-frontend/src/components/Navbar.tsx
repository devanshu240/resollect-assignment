import "./Navbar.css"  
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1 className="text-3xl font-bold tracking-wider text-yellow-300">
        <Link to="/dashboard">Task Manager</Link>
      </h1>

      <div className="flex items-center gap-8 text-lg">
        <Link
          to="/pending-tasks"
          className="hover:text-yellow-400 transition duration-300"
        >
          Pending
        </Link>
        <Link
          to="/missing-tasks"
          className="hover:text-yellow-400 transition duration-300"
        >
          Missing 
        </Link>
        <Link
          to="/completed-tasks"
          className="hover:text-yellow-400 transition duration-300"
        >
          Completed
        </Link>
        <Link
          to="/add-task"
          className="hover:text-yellow-400 transition duration-300"
        >
          Add Task
        </Link>
        <button
          onClick={handleLogout}
          className="logout-btn"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
