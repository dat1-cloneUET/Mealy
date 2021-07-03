import { createContext, useState, useContext } from "react";
import {
    useHistory,
    useLocation
  } from "react-router-dom";
export const StoreContext = createContext({});

const Context = ({ children }) => {
    
    // const history= useHistory();
    const GoToMainScreen = () => useHistory().push("/");
    return (
        <StoreContext.Provider value={{GoToMainScreen}}>{children}</StoreContext.Provider>
        // <div></div>
    )
}
export default Context;
