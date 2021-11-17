import React, { useContext, useState, useEffect } from "react";
import api from "../../BE.config";
import axios from "axios";

const url = api.concat("/api/auth");
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('token') || '');

  function signup(email, password, username = "fuck") {
    return axios.post(url.concat("/registerWithEmailAndPassword"), {
      email,
      password,
      username,
    });
  }

  function login(email, password) {
    return axios.post(url.concat("/login"), {
      email,
      password,
    });
  }

  function getUserInfo() {
    return axios.get(url.concat('/getUserInfo'), {
      headers: {
        token: currentUser,
      }
    })
  }
  function resetPassword(email) {
    return axios.post(url.concat('/resetPassword'), {
      email
    })
  }
  function logout() {
    setCurrentUser(null)
  }

  function genMomoUrl(money= 10000) {
    return axios.get(url.concat(`/genMomoUrl?money=${money}`))
  }

  // function updateEmail(email) {
  //   return currentUser.updateEmail(email);
  // }

  // function updatePassword(password) {
  //   return currentUser.updatePassword(password);
  // }



  const value = {
    currentUser,
    setCurrentUser,
    login,
    signup,
    getUserInfo,
    logout,
    resetPassword,
    genMomoUrl
    // updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
