import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useLocation,
  Link
} from "react-router-dom";
// import Navigate from "./Contexts";
ReactDOM.render(
  // <Navigate>
  <Router>
    <App />
  </Router>
// </Navigate>
  ,document.getElementById('root')
);

