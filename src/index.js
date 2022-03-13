import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import Scene from "./scene";

new Scene();

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
