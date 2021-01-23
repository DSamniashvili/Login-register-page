import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import {useContext} from "react";
import {AppContext} from '../../contexts/AppContext';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Header = () => {
    const classes = useStyles();
    const {state, dispatch} = useContext(AppContext);


    const logoutUser = () => {
        dispatch({type: 'LOGOUT_USER', payload: {isAuth: false}});
    }
    const loginUser = () => {
        dispatch({type: 'AUTHENTICATE_USER', payload: {isAuth: true}});
    }
    const registerUser = () => {
        // dispatch({type: 'AUTHENTICATE_USER', payload: {isAuth: true}});
    }
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {state.isAuth ?
                            'My Dashboard' :
                            'Dataninja App'
                        }
                    </Typography>
                    {state.isAuth ? (
                            <div>
                                <IconButton
                                    aria-label="Logout"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={logoutUser}
                                    color="inherit"
                                >
                                    <ExitToAppIcon/>
                                </IconButton>

                            </div>
                        ) :
                       <React.Fragment>
                           <MenuItem onClick={registerUser}>Register</MenuItem>
                           {/*<MenuItem onClick={loginUser}>Login</MenuItem>*/}
                       </React.Fragment>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;
