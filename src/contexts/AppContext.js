import React, { createContext, useReducer, useEffect } from "react";
import {authenticationReducer} from "../reducers/authenticationReducer";
import axios from "axios";

export const AppContext = createContext();

const initialState = {
    isAuth: false,
    isRegistered: false,
    loading: true,
    error: '',
    userInfo: [],
}

const AppContextProvider = props => {
    const [state, dispatch] = useReducer(authenticationReducer, initialState, () => {
        const localStorageData = localStorage.getItem('isAuth');
            return localStorageData ? {isAuth: JSON.parse(localStorageData), isRegistered: JSON.parse(localStorageData)} : initialState;
    });

    useEffect(() => {
        localStorage.setItem('isAuth', JSON.stringify(state.isAuth));

        if(state.isAuth && !state.userInfo){
            dispatch({type: 'FETCH_PROCESSING', payload: {}})
            axios.get('https://jsonplaceholder.typicode.com/users/')
                .then(response => {
                    setTimeout(() => {
                        dispatch({type: 'FETCH_SUCCESS', payload: response.data})
                    }, 1000);

                })
                .catch(error => {
                    dispatch({type: 'FETCH_ERROR', payload: 'Something went wrong'})
                })
        }

    });

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;