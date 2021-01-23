import React, { useContext} from 'react';
import LoginForm from "./LoginPopup";
import UserDashboard from "./UserDashboard";
import {AppContext} from "../contexts/AppContext";

const Container = () => {
    const {state} = useContext(AppContext);

    return (
        <React.Fragment>
            {
                state.isAuth ?
                    <UserDashboard/> :
                    <LoginForm/>
            }

        </React.Fragment>
    );
}

export default Container;