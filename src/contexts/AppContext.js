import React, { createContext, useReducer, useEffect } from "react";
import {authenticationReducer} from "../reducers/authenticationReducer";

export const AppContext = createContext();
const initialState = {
    isAuth: false,
}

const AppContextProvider = props => {
    const [state, dispatch] = useReducer(authenticationReducer, initialState, () => {
        const localStorageData = localStorage.getItem('isAuth');
            return localStorageData ? {isAuth: JSON.parse(localStorageData)} : initialState;
    });

    useEffect(() => {
        localStorage.setItem('isAuth', JSON.stringify(state.isAuth));
    });

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;