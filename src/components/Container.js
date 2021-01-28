import React, { useContext} from 'react';
import LoginPopup from "./LoginPopup";
import UserDashboard from "./UserDashboard";
import {AppContext} from "../contexts/AppContext";
import Registration from "./Registration";
import UserDashboard1 from "./UserDashboard1";

const Container = () => {
    const {state} = useContext(AppContext);

    const renderContent = () => {
        if (!state.isRegistered){
            return <Registration/>;
        } else if(state.isAuth){
            return <UserDashboard1/>;
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