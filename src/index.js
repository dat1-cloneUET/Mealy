import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { LoaderProvider } from "./components/context/LoaderProvider";
import { AuthProvider } from "./components/context/AuthProvider";
import { BookingProvider } from "./components/context/BookingProvider";
ReactDOM.render(
  <Router>
    <BookingProvider>
      <LoaderProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LoaderProvider>
    </BookingProvider>
  </Router>,
  document.getElementById("root")
);
