import React, {useContext, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {AppContext} from '../contexts/AppContext';

import validate from '../validation'
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerStyle: {
        display: 'flex',
        justifyContent: 'center',
        minHeight: 50,
        alignItems: 'center',
    }
}));

const LoginForm = () => {
    const classes = useStyles();
    const {dispatch} = useContext(AppContext);


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!username || username.length === 0 || !password || password.length === 0){
            setUsername('');
            setPassword('');
            setIsInvalid(true);
            dispatch({type: 'AUTHENTICATE_USER', payload: {isAuth: false}});
        } else {
            dispatch({type: 'AUTHENTICATE_USER', payload: {isAuth: true}});
            setUsername('');
            setPassword('');
        }
    }

    return (
        <div className={classes.containerStyle}>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    error={isInvalid}
                    value={username || ''}
                    id="filled-basic"
                    label="name"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField id="filled-basic"
                           error={isInvalid}
                           value={password || ''}
                           label="password"
                           type={password}
                           isRequired="true"
                           onChange={(e) => setPassword(e.target.value)}
                />

                <Button variant="contained" color="primary"
                        onClick={handleSubmit}>
                    Login
                </Button>
            </form>
        </div>
    );
}

export default LoginForm;