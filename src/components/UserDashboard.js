import React, {useState, useEffect} from "react";
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useAppContext} from "../contexts/AppContext";
import axios from "axios";
import Typography from "@material-ui/core/Typography";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    containerClass: {
        display: 'block',
        maxWidth: '90%',
        minWidth: 650,
        margin: 'auto',
        marginTop: 50,
    },
    title: {
        flex: '1 1 100%',
        margin: theme.spacing(2),
        display: 'flex',
        justifyContent: 'flex-start',
        padding: theme.spacing(2),
    },
}));

const getUsersTable = ({dispatch}) => {
    dispatch({type: 'FETCH_PROCESSING', payload: {}})
    axios.get('https://jsonplaceholder.typicode.com/users/')
        .then(response => {
            dispatch({type: 'FETCH_SUCCESS', payload: response.data})
        })
        .catch(error => {
            dispatch({type: 'FETCH_ERROR', payload: 'Something went wrong'})
        })
}

const UserDashboard = () => {
    const classes = useStyles();

    const {state, dispatch} = useAppContext()
    let [tableHeading, setTableHeading] = useState([]);

    useEffect(() => {
        getUsersTable({dispatch});
    }, []);

    useEffect(() => {
        setTableHeading(tableHeading = Object.keys(Object.assign({}, ...state.userInfo)));
    }, [state.userInfo]);

    return (
        <div className={classes.containerClass}>
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                Dummy users' list
            </Typography>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="table">
                    <TableHead>
                        <TableRow>
                            {
                                tableHeading.map((item, index) => {
                                    return <StyledTableCell key={index}>{item}</StyledTableCell>
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            state.userInfo &&
                            Object.values(state.userInfo).map((row, index) => (
                                <TableRow key={index}>
                                    {
                                        Object.values(row).map((item, index) => {
                                            if (typeof item === 'object') {
                                                return <TableCell key={index}>{Object.values(item)[0]}</TableCell>
                                            }
                                            return <TableCell key={index}>{item}</TableCell>
                                        })
                                    }
                                </TableRow>
                            ))
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}


export default UserDashboard;