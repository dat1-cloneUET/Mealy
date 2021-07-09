import React, {createContext, useState, useEffect, useContext} from 'react'
const LoaderContext= createContext();
export const useLoader = () => useContext(LoaderContext);

export function LoaderProvider({children}) {
    const [isLoading, setIsLoading]= useState(false);
    const turnOnLoader = () =>{
        setIsLoading(true);
    }
    const turnOffLoader = () =>{
        setIsLoading(false);
    }

    const value = {
        isLoading,
        turnOnLoader,
        turnOffLoader
    }
    
    return (
        <LoaderContext.Provider value={value}>
            {children}
        </LoaderContext.Provider>
    )
}


