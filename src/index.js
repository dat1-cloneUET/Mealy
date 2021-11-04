import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { LoaderProvider } from "./components/context/LoaderProvider";
import { AuthProvider } from "./components/context/AuthProvider";
ReactDOM.render(
  <Router>
    <LoaderProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LoaderProvider>
  </Router>,
  document.getElementById("root")
);
