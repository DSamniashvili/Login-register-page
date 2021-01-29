import React, {useContext, useEffect, useState} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {AppContext, useAppContext} from '../contexts/AppContext';
import MuiAlert from '@material-ui/lab/Alert';
import {
    FormControl, FormControlLabel, FormLabel,
    InputLabel,
    MenuItem, Radio, RadioGroup,
    Select
} from "@material-ui/core";

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
        marginBottom: 0,
    },
    buttonStyle: {
        margin: theme.spacing(2),
    },
    formGenderStyle: {
        display: 'flex',
    },
    genderLabelStyle: {
        display: 'flex',
        justifyContent: 'flex-start',
        width: '100%',
    },
    genderOptionsStyle: {
        color: '#757575',
    }
}));

const selectGenders = [
    {
        value: "female",
        label: "Female"
    },
    {
        value: "male",
        label: "Male"
    },
    {
        value: "other",
        label: "Other"
    },
];

const sendUserRegistration = ({dispatch}, {username, password}) => {
    let userRegistrationPromise = new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve('User registered successfully');
            reject('Could not register user');
        }, 300)
    })

    userRegistrationPromise.then((response) => {
        console.log("User registration response: " + response)
        dispatch({type: 'SET_USER_INITIALS', payload: {username, password}});
        dispatch({type: 'REGISTER_USER', payload: {isRegistered: true}});
    })
        .catch(err => {
            console.log('User registration failed. ', err);
            dispatch({type: 'REGISTER_USER', payload: {isRegistered: false}});
        })
}

const Registration = () => {
    const classes = useStyles();
    const {state, dispatch} = useAppContext()

    const [userRegistrationFields, setUserRegistrationFields] = useState({
        username: '',
        password: '',
        email: '',
        gender: '',
    });

    const [registrationErrors, setRegistrationErrors] = useState({
        isInvalidGeneral: false,
        isInvalidEmail: false,
    });

    const ValidateEmail = (email) => {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
    }

    const handleChange = (event) => {
        setUserRegistrationFields(state => ({
            ...state,
            [event.target.name]: event.target.value
        }));
    }

    const handleRegistrationErrors = (errorType, value) => {
        setRegistrationErrors(state => ({
            ...state,
            [errorType]: value,
        }));
    }

    const handleSubmit = (e) => {
        setRegistrationErrors({
            isInvalidGeneral: false,
            isInvalidEmail: false,
        })
        const {username, password, email, gender} = userRegistrationFields;

        e.preventDefault();

        const inValidEmail = !email || !ValidateEmail(email);
        const inValidName = !username || username.length === 0;
        const inValidPassword = !password || password.length === 0;

        if (inValidEmail || inValidName || inValidPassword) {
            if (inValidEmail) {
                setUserRegistrationFields({
                    ...userRegistrationFields,
                    email: '',
                });

                handleRegistrationErrors('isInvalidEmail', true);
            }

            if (inValidName || inValidPassword) {
                setUserRegistrationFields({
                    ...userRegistrationFields,
                    username: '',
                    password: '',
                });
                handleRegistrationErrors('isInvalidGeneral', true);
            }
        } else {
            sendUserRegistration({dispatch}, {username, password});
        }
    }

    const CustomMenuItem = withStyles({
        root: {
            color: '#303f9f',
        },
    })((props) => {
        return <MenuItem {...props}/>
    });

    return (
        <div className={classes.containerStyle}>
            <form className={classes.root} autoComplete="off">
                <TextField
                    error={registrationErrors.isInvalidGeneral}
                    value={userRegistrationFields.username || ''}
                    id="filled-basic"
                    label="username"
                    name="username"
                    required
                    onChange={e => handleChange(e)}
                />
                <TextField
                    error={registrationErrors.isInvalidEmail}
                    value={userRegistrationFields.email || ''}
                    id="filled-basic"
                    label="email"
                    name="email"
                    required
                    onChange={e => handleChange(e)}
                />
                <TextField id="filled-basic"
                           error={registrationErrors.isInvalidGeneral}
                           value={userRegistrationFields.password || ''}
                           label="password"
                           name="password"
                           type={'password'}
                           required
                           onChange={e => handleChange(e)}
                />
                <FormControl className={classes.formGenderStyle}>
                    <InputLabel id="gender">Gender</InputLabel>
                    <Select
                        labelId="gender"
                        id="gender"
                        name="gender"
                        value={userRegistrationFields.gender || ''}
                        onChange={e => handleChange(e)}
                    >
                        {selectGenders.map(option => {
                            const {value, label} = option;
                            return (
                                <CustomMenuItem key={value}
                                                value={value}>
                                    {label}
                                </CustomMenuItem>
                            )
                        })
                        }
                    </Select>
                </FormControl>

                <Button variant="contained" color="primary"
                        onClick={handleSubmit} className={classes.buttonStyle}>
                    Register
                </Button>
            </form>

            {
                registrationErrors.isInvalidGeneral ?
                    <div className={classes.errorMessageArea}>
                        <Alert severity="error">Please provide correct username & password.</Alert>
                    </div> :
                    null
            }
            {
                registrationErrors.isInvalidEmail ?
                    <div className={classes.errorMessageArea}>
                        <Alert severity="error">Please provide correct email address.</Alert>
                    </div> :
                    null
            }

        </div>
    );
}

export default Registration;
