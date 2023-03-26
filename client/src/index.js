import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { DarkModeContextProvider } from "./context/darkModeContext";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DarkModeContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DarkModeContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
