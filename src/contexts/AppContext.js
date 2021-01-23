import React, {useState, createContext, useReducer, useEffect, Component} from "react";
import {userReducer} from "../reducers/userReducer";

export const AppContext = createContext();


const AppContextProvider = props => {
    // const [isAuth, setAuth] = useState(false);
    const [state, dispatch] = useReducer(userReducer, {
        isAuth: true,
    });

    // const authenticate = (username, password) => {
    //     console.log('authenticate', username, password);
    //     setAuth(true);
    //     localStorage.setItem('isAuth', 'true');
    // }
    //
    // const logout = () => {
    //     if (localStorage.getItem('isAuth') === 'true') {
    //         localStorage.removeItem('isAuth');
    //     }
    //
    //     setAuth(false);
    // }

    // useEffect(() => {
    //     localStorage.setItem('isAuth', JSON.stringify(isAuth));
    // }, [isAuth])


    return (
        <AppContext.Provider value={{state, dispatch}}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;