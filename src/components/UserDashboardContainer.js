import UserDashboard from "./UserDashboard";
import React from "react";
import SortableTable from "./SortableTable";

const UserDashboardContainer = () => {
    return (
        <React.Fragment>
            <SortableTable/>
            <UserDashboard/>
        </React.Fragment>
    )

}

export default UserDashboardContainer;

