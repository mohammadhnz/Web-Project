import * as React from 'react';
import {Box, Container, CssBaseline, Link} from "@mui/material";
import {Typography} from "antd";

function Copyright() {
    return (
        <Typography variant="body2" style={{color: "grey"}}>
            {'Copyright © '}
            <Link color="inherit" href="">
                Marvellona
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function StickyFooter() {

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '50vh',
                marginTop: 'auto',
                textAlign: 'center',
                marginBottom: '0',
                position: 'absolute',
                left: 0,
                bottom: 0,
                right: 0
            }}
        >
            <CssBaseline/>
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                }}
            >
                <Container maxWidth="sm">
                    <Typography variant="body1">
                        Roya Ghavami , MohammadAli HosseinNejad, Mikael Ghourbani
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
}