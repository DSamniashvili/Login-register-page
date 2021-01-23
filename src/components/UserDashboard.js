import React, {useContext, useState} from "react";
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import {AppContext} from "../contexts/AppContext";

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
});

const UserDashboard = () => {
    const classes = useStyles();
    const {state} = useContext(AppContext);

    const [userInfo, setUserInfo] = useState([
        {
            name: 'Dea',
            surname: 'Samniashvili',
            age: 24,
            gender: 'female',
            userName: 'dsmn',
        }
    ]);

    return state.isAuth ? (
            <Container maxWidth="xl">
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>FullName</StyledTableCell>
                                <StyledTableCell align="right">Name</StyledTableCell>
                                <StyledTableCell align="right">Surname</StyledTableCell>
                                <StyledTableCell align="right">Age</StyledTableCell>
                                <StyledTableCell align="right">Gender</StyledTableCell>
                                <StyledTableCell align="right">Username</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userInfo.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name + ' ' + row.surname}
                                    </TableCell>
                                    <TableCell align="right">{row.name || ' - '}</TableCell>
                                    <TableCell align="right">{row.surname || ' - '}</TableCell>
                                    <TableCell align="right">{row.age || ' - '}</TableCell>
                                    <TableCell align="right">{row.gender || ' - '}</TableCell>
                                    <TableCell align="right">{row.userName || ' - '}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        ) :
        '';
}


export default UserDashboard;