import React, { useContext} from 'react';
import LoginPopup from "./LoginPopup";
import UserDashboard from "./UserDashboard";
import {AppContext} from "../contexts/AppContext";
import Registration from "./Registration";

const Container = () => {
    const {state} = useContext(AppContext);

    const renderContent = () => {
        if (!state.isRegistered){
            return <Registration/>;
        } else if(state.isAuth){
            return <UserDashboard/>;
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