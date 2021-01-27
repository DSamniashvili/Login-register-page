import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CopyrightIcon from '@material-ui/icons/Copyright';
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        // flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    toolBaClass: {
        textAlign: "center",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolBaClass}>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="copyright">
                        <CopyrightIcon/>
                    </IconButton>

                    <Typography variant="h6" className={classes.title}>
                       All rights reserved
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}