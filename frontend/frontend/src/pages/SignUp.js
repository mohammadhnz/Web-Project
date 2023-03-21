import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {MainButton} from "../components/MainButton";
import instance from "../api/Api";
import axios from "axios";


const theme = createTheme({
    direction: 'rtl',
});

export default function SignUp() {
    const navigate = useNavigate();

    const [fieldState, setFieldState] = useState({
        first_name: false,
        last_name: false,
        username: false,
        password: false,
        password_confirm: false,
        email: false,
        gender: true,
    })


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // TODO: send signup data and after check navigate

        const d = {
            first_name: data.get('first_name'),
            last_name: data.get('last_name'),
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
            password_confirm: data.get('password_confirm'),
            gender: "male",
            account_type: "seller"
        }
        console.log("post data: ", d)
        axios({
            method: 'post',
            url: 'https://bd90-31-56-230-17.eu.ngrok.io/core/register/',
            data: d,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },
        }).then(function (response) {
            console.log(response);
            const userEmail = response.data.email;
            console.log(userEmail)
            navigate("/", {state: userEmail})
        }).catch(function (error) {
            alert("please try again!")
            console.log(error);
        });
    };

    const handleEmailChange = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value)) {
            setFieldState((prevForm) => ({...prevForm, email: true}))
        } else {
            setFieldState((prevForm) => ({...prevForm, email: false}))
        }
    }
    const handlePassChange = (e) => {
        e.preventDefault()
        setFieldState((prevForm) => ({...prevForm, password: false}))
    }

    const handlePassValChange = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        setFieldState((prevForm) => ({...prevForm, password_confirm: false}))
    }

    const handleNameChange = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        if (!/^[a-zA-Z0-9]+$/.test(value)) {
            setFieldState((prevForm) => ({...prevForm, first_name: true}))
        } else {
            setFieldState((prevForm) => ({...prevForm, first_name: false}))
        }
    }

    const handleUsernameChange = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        if (!/^[a-zA-Z0-9]+$/.test(value)) {
            setFieldState((prevForm) => ({...prevForm, username: true}))
        } else {
            setFieldState((prevForm) => ({...prevForm, username: false}))
        }
    }

    const handleLastChange = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        if (!/^[a-zA-Z0-9]+$/.test(value)) {
            setFieldState((prevForm) => ({...prevForm, last_name: true}))
        } else {
            setFieldState((prevForm) => ({...prevForm, last_name: false}))
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: '#ba0438'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        ثبت نام کنید
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="first_name"
                                    required
                                    fullWidth
                                    id="first_name"
                                    label="نام"
                                    error={fieldState.first_name}
                                    helperText={fieldState.first_name ? 'use alphabet!' : ' '}
                                    onChange={handleNameChange}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="last_name"
                                    label="نام خانوادگی"
                                    name="last_name"
                                    autoComplete="family-name"
                                    error={fieldState.last_name}
                                    helperText={fieldState.last_name ? 'use alphabet!' : ' '}
                                    onChange={handleLastChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="آدرس ایمیل"
                                    name="email"
                                    autoComplete="email"
                                    error={fieldState.email}
                                    helperText={fieldState.email ? 'correct the email format!' : ' '}
                                    onChange={handleEmailChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="شناسه کاربری"
                                    name="username"
                                    autoComplete="username"
                                    error={fieldState.username}
                                    helperText={fieldState.username ? 'correct the email format!' : ' '}
                                    onChange={handleUsernameChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="پسورد"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    error={fieldState.password}
                                    helperText={fieldState.password ? 'at least one letter and one number' : ' '}
                                    onChange={handlePassChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password_confirm"
                                    label="تایید پسورد"
                                    type="password"
                                    id="password_confirm"
                                    autoComplete="new-password"
                                    error={fieldState.password_confirm}
                                    helperText={fieldState.password_confirm ? 'at least one letter and one number' : ' '}
                                    onChange={handlePassValChange}
                                />
                            </Grid>


                        </Grid>
                        <MainButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            ثبت نام
                        </MainButton>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/sign_in" variant="body2">
                                    اکانت دارید؟ وارد شوید
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>);
}