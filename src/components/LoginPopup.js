import React, {useContext, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {AppContext} from '../contexts/AppContext';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
        flexDirection: "column",
    },
    errorMessageArea: {
        margin: theme.spacing(5),
    },
    buttonStyle: {
        margin: theme.spacing(2),
    }
}));

const LoginForm = () => {
    const classes = useStyles();
    const {state, dispatch} = useContext(AppContext);


    const [inputUserName, setUsername] = useState('');
    const [inputPassword, setPassword] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const {username, password} = state.loginInitials;

        if (!inputUserName || inputUserName.length === 0 || username !== inputUserName
            || !inputPassword || inputPassword.length === 0 || password !== inputPassword) {
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
                    value={inputUserName || ''}
                    id="filled-basic"
                    label="name"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField id="filled-basic"
                           error={isInvalid}
                           value={inputPassword || ''}
                           label="password"
                           type={'password'}
                           onChange={(e) => setPassword(e.target.value)}
                />

                <Button variant="contained" color="primary"
                        onClick={handleSubmit} className={classes.buttonStyle}>
                    Login
                </Button>
            </form>

            {
                isInvalid ?
                    <div className={classes.errorMessageArea}>
                        <Alert severity="error">Please provide correct username & password.</Alert>
                    </div> :
                    null
            }

        </div>
    );
}

export default LoginForm;