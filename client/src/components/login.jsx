import GoogleIcon from '@mui/icons-material/Google';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import URLSearchParams from 'url-search-params';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import {
    TextField,
    Button,
    Typography,
    Card,
    CardContent,
} from '@material-ui/core';
import {
    GitHub as GitHubIcon,
    Facebook as FacebookIcon,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    grid: {
        margin: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
        width: '100%',
    },
    card: {
        width: '30%',
        margin: 'auto',
        marginTop: '5%',
        boxShadow: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

function LoginForm() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const search = new URLSearchParams(window.location.search);
    const email = search.get("email");
    const fullname = search.get("fullname");
    const secret = search.get("secret");

    useEffect(() => {
        if (email && fullname && secret) {
            localStorage.setItem(
                "user",
                JSON.stringify({
                    email,
                    fullname,
                    secret,
                })
            );
            navigate("/success", { state: { message: "Logged in successfully" }, replace: true });

        }
    }, [email, fullname, secret]);


    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
    }, [user]);


    const handleGoogleClick = () => {
        window.location.href = 'http://localhost:5000/auth/google';
    }

    const handleGithubClick = () => {
        window.location.href = 'http://localhost:5000/auth/github';
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Typography variant="h4">Log in</Typography>
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        className={classes.textField}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        className={classes.textField}
                    />
                    <Button variant="contained" color="primary" className={classes.button}>
                        Log in
                    </Button>
                    <Typography variant="body1">
                        Or log in with one of the following:
                    </Typography>
                    <Button
                        onClick={handleGoogleClick}
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<GoogleIcon />}
                    >
                        Google
                    </Button>
                    <Button
                        onClick={handleGithubClick}
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<GitHubIcon />}
                    >
                        GitHub
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<FacebookIcon />}
                    >
                        Facebook
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default LoginForm;
