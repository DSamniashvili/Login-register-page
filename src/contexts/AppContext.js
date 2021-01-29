import React, {createContext, useReducer, useEffect, useContext} from "react";
import {authenticationReducer} from "../reducers/authenticationReducer";

export const AppContext = createContext();

const initialState = {
    isAuth: false,
    isRegistered: false,
    loading: false,
    error: '',
    userInfo: [],
    loginInitials: {},
}

const AppContextProvider = props => {
    const [state, dispatch] = useReducer(authenticationReducer, initialState, () => {
        const localStorageData = localStorage.getItem('isAuth');
        const localStorageDataRegistered = localStorage.getItem('isRegistered');
        const localStorageLoginInitials = localStorage.getItem('loginInitials');

        return localStorageData ? {
            ...initialState,
            isAuth: JSON.parse(localStorageData),
            isRegistered: JSON.parse(localStorageDataRegistered),
            loginInitials: JSON.parse(localStorageLoginInitials),
        } : initialState;
    });

    useEffect(() => {
        localStorage.setItem('isAuth', JSON.stringify(state.isAuth));
        localStorage.setItem('isRegistered', JSON.stringify(state.isRegistered));
        localStorage.setItem('loginInitials', JSON.stringify(state.loginInitials));

    });

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;

export function useAppContext(){
    return useContext(AppContext);
}