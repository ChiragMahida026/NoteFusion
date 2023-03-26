import "./navbar.scss";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
// import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
// import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import { DarkModeContext } from "../../context/darkModeContext";
// import { useContext } from "react";

const Navbar = () => {
  // const { dispatch } = useContext(DarkModeContext);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search" style={{ border: "none" }}>
          {/* <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon /> */}
        </div>
        <div className="items">
          {/* <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div> */}

          {/* <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div> */}
          {/* <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div> */}
          {/* <div className="item">
            <ListOutlinedIcon className="icon" />
          </div> */}
          <div
            className="item"
            onClick={logout}
            style={{ color: "#7451f8", cursor: "pointer" }}
          >
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
