import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import {MainButton} from "../components/MainButton";
import instance from "../api/Api";


const theme = createTheme({
    direction: 'rtl',
});

export default function SignIn() {
    const navigate = useNavigate();

    const postSignInData = (data) => {
        instance.post('/users', data).then((res) => {
            // here clear your form and fetch your users list if you want
            console.log(res);
        })
            .catch(error => {
                // here catch error messages from laravel validator and show them
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        // TODO: send signin data and after check navigate
        postSignInData({email: data.get('email'), password: data.get('password')})
        navigate("/");
    };

    return (
        <div dir="rtl" className="rmdp-rtl">
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
                            ورود
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="آدرس ایمیل"
                                name="email"
                                // autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="پسورد"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label="به خاطر سپردن"
                                labelPlacement="start"
                            />
                            <MainButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                ورود
                            </MainButton>
                            <Grid container>
                                <Grid item>
                                    <Link href="/sign-up" variant="body2">
                                        {"اکانت ندارید؟ ثبت نام کنید"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}