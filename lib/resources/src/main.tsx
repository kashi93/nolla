import * as React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";

ReactDOM.hydrate(
    <BrowserRouter>
        <Router />
    </BrowserRouter>,
    document.getElementById("app")
);