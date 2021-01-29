import React from 'react';
import LoginPopup from "./LoginPopup";
import {useAppContext} from "../contexts/AppContext";
import Registration from "./Registration";
import UserDashboardContainer from "./UserDashboardContainer";

const Container = () => {
    const {state} = useAppContext()

    const renderContent = () => {
        if (!state.isRegistered) {
            return <Registration/>;
        }
        if (state.isAuth) {
            return (
                <UserDashboardContainer/>
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