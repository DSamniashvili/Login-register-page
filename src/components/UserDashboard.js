import React, {useContext, useState, useEffect} from "react";
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Loading from "./general-components/Loading";
import {AppContext} from "../contexts/AppContext";
import axios from "axios";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    containerClass: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    }
});

const UserDashboard = () => {
    const classes = useStyles();
    const {state, dispatch} = useContext(AppContext);
    let [tableHeading, setTableHeading] = useState([]);


    if(state.userInfo && state.userInfo.length > 0){
        tableHeading = Object.keys(Object.assign({}, ...state.userInfo));
    }


    useEffect(() => {
        if(!tableHeading || tableHeading.length === 0){
            setTableHeading(tableHeading);
        }
    }, []);


    return state.loading ?
        <Loading/> : (
            <Container maxWidth="xl" className={classes.containerClass}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {
                                    tableHeading.map(item => {
                                        return <StyledTableCell>{item}</StyledTableCell>
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                state.userInfo &&
                                Object.values(state.userInfo).map((row, index) => (
                                    <TableRow>
                                        {
                                            Object.values(row).map(item => {
                                                if(typeof item === 'object'){
                                                    return  <TableCell>---</TableCell>
                                                }
                                                return <TableCell>{item}</TableCell>
                                            })
                                        }

                                    </TableRow>
                                ))
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        )
}


export default UserDashboard;