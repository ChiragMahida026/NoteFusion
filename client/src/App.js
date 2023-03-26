// react-scripts@4.0.3
import Login from "./pages/login/Login";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Mains from "./Mains";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const logged = window.localStorage.getItem("isLOgging");

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="App">{logged ? <Mains /> : <Login />}</div>
    </div>
  );
}

export default App;
