import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
// import BugReportIcon from "@mui/icons-material/BugReport";
// import LogoDevIcon from "@mui/icons-material/LogoDev";
import LaptopMacTwoToneIcon from "@mui/icons-material/LaptopMacTwoTone";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
// import { DarkModeContext } from "../../context/darkModeContext";
// import { useContext } from "react";

const Sidebar = () => {
  // const { dispatch } = useContext(DarkModeContext);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">DevOps</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Services</span>
            </li>
          </Link>
          {/* <p className="title">LISTS</p>
          <Link to="/dev" style={{ textDecoration: "none" }}>
            <li>
              <LogoDevIcon className="icon" />
              <span>Dev</span>
            </li>
          </Link>
          <Link to="/qa" style={{ textDecoration: "none" }}>
            <li>
              <BugReportIcon className="icon" />
              <span>Qa</span>
            </li>
          </Link> */}
          <Link to="/project" style={{ textDecoration: "none" }}>
            <li>
              <LaptopMacTwoToneIcon className="icon" />
              <span>Add Project</span>
            </li>
          </Link>

          {/* <p className="title">USER</p>
          <li onClick={logout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li> */}
        </ul>
      </div>
      {/* <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div> */}
    </div>
  );
};

export default Sidebar;
