import React, {useContext} from 'react';
import LoginPopup from "./LoginPopup";
import UserDashboard from "./UserDashboard";
import {AppContext, useAppContext} from "../contexts/AppContext";
import Registration from "./Registration";
import UserDashboard1 from "./UserDashboard1";

const Container = () => {
    const {state, dispatch} = useAppContext()

    const renderContent = () => {
        if (!state.isRegistered) {
            return <Registration/>;
        }
        if (state.isAuth) {
            return (
                <React.Fragment>
                    <UserDashboard1/>
                    <UserDashboard/>
                </React.Fragment>
            )
        } else {
            return <LoginPopup/>;
        }
    }

    return (
        <React.Fragment>
            {
                renderContent()
            }

        </React.Fragment>
    );
}

export default Container;