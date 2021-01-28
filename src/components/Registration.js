import React, {useContext, useEffect, useState} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {AppContext} from '../contexts/AppContext';
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
        // marginTop: 24,
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

const Registration = () => {
    const classes = useStyles();
    const {state, dispatch} = useContext(AppContext);


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);

    const ValidateEmail = (email) => {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !ValidateEmail(email)) {
            setIsInvalidEmail(true);
        }

        if (!username || username.length === 0 || !password || password.length === 0) {
            setUsername('');
            setPassword('');
            setIsInvalid(true);
            dispatch({type: 'REGISTER_USER', payload: {isRegistered: false}});
        } else {
            dispatch({type: 'REGISTER_USER', payload: {isRegistered: true}});
            dispatch({type: 'SET_USER_INITIALS', payload: {username, password}});
            setUsername('');
            setPassword('');
            setEmail('');
            setGender('');
        }
    }

    const CustomMenuItem = withStyles({
        root: {
            color: '#303f9f',
        },
    })((props) => <MenuItem {...props}/>);

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    return (
        <div className={classes.containerStyle}>
            <form className={classes.root} autoComplete="off">
                <TextField
                    error={isInvalid}
                    value={username || ''}
                    id="filled-basic"
                    label="name"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    error={isInvalidEmail}
                    value={email || ''}
                    id="filled-basic"
                    label="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField id="filled-basic"
                           error={isInvalid}
                           value={password || ''}
                           label="password"
                           type={'password'}
                           required
                           onChange={(e) => setPassword(e.target.value)}
                />
                <FormControl className={classes.formGenderStyle}>
                    <InputLabel id="gender">Gender</InputLabel>
                    <Select
                        labelId="gender"
                        id="gender"
                        value={gender || ''}
                        onChange={handleGenderChange}
                    >
                        {selectGenders.map(option => (
                            <CustomMenuItem key={option.value} value={option.value}>
                                {option.label}
                            </CustomMenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button variant="contained" color="primary"
                        onClick={handleSubmit} className={classes.buttonStyle}>
                    Register
                </Button>
            </form>

            {
                isInvalid ?
                    <div className={classes.errorMessageArea}>
                        <Alert severity="error">Please provide correct username & password.</Alert>
                    </div> :
                    null
            }
            {
                isInvalidEmail ?
                    <div className={classes.errorMessageArea}>
                        <Alert severity="error">Please provide correct email address.</Alert>
                    </div> :
                    null
            }

        </div>
    );
}

export default Registration;
