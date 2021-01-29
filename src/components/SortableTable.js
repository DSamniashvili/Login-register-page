import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import MaterialTable from "material-table";


const useStyles = makeStyles({
    containerClass: {
        display: 'block',
        maxWidth: '90%',
        minWidth: 650,
        margin: 'auto',
    }
});

const SortableTable = () => {
    const classes = useStyles();

    const data = [
        {name: 'Ana', age: 12},
        {name: 'Dea', age: 21},
        {name: 'Nino', age: 45},
        {name: 'Mari', age: 10},
    ];

    const columns = [
        {title: 'name', field: 'name'},
        {title: 'age', field: 'age'},
    ];

    return (
        <div className={classes.containerClass}>
            <MaterialTable
                title="People's Sortable list"
                columns={columns}
                data={data}
                options={{
                    paging: false,
                    filtering: true,
                    exportButton: true,
                }}
            />
        </div>

    )
}


export default SortableTable;