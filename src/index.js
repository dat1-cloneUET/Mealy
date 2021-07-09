import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import {LoaderProvider} from './components/context/LoaderProvider';
ReactDOM.render(
    <Router>
      <LoaderProvider>
        <App />
      </LoaderProvider>
    </Router>
  ,document.getElementById('root')
);

