import React, {useContext, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {AppContext, useAppContext} from '../contexts/AppContext';
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
    const {state, dispatch} = useAppContext()

    const [isInvalid, setIsInvalid] = useState(false);
    const [userLoginInitials, setUserLoginInitials] = useState({
        inputUserName: '',
        inputPassword: '',
    })

    const handleChange = (event) => {
        setUserLoginInitials(state => ({
            ...state,
            [event.target.name]: event.target.value
        }));
    }

    const callToAuthenticate = ({inputUserName, inputPassword}) => {
        const {username, password} = state.loginInitials;

        let userLoginPromise = new Promise((resolve, reject) => {

            if (!inputUserName || inputUserName.length === 0 || username !== inputUserName
                || !inputPassword || inputPassword.length === 0 || password !== inputPassword) {
                reject('Could not authenticate user');
            }
            setTimeout(function () {
                resolve('User authenticated successfully');
            }, 300)
        })

        userLoginPromise.then((response) => {
            console.log("User Login response: " + response)
            dispatch({type: 'AUTHENTICATE_USER', payload: {isAuth: true}});
        })
            .catch(err => {
                console.log('User Login response: ', err);
                setIsInvalid(true)
                dispatch({type: 'AUTHENTICATE_USER', payload: {isAuth: false}});
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setUserLoginInitials({
            inputUserName: '',
            inputPassword: '',
        });

        const {inputUserName, inputPassword} = userLoginInitials;
        callToAuthenticate({inputUserName, inputPassword});
    }

    return (
        <div className={classes.containerStyle}>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    error={isInvalid}
                    value={userLoginInitials.inputUserName || ''}
                    name={'inputUserName'}
                    id="filled-basic"
                    label="name"
                    onChange={e => handleChange(e)}
                />
                <TextField id="filled-basic"
                           error={isInvalid}
                           value={userLoginInitials.inputPassword || ''}
                           label="password"
                           name={"inputPassword"}
                           type={'password'}
                           onChange={e => handleChange(e)}
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