import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./theme/style.scss";
import { HashRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
      </Routes>
    </HashRouter>
  </div>
);
