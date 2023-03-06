import Grid from "@mui/material/Grid";
import {Box, Container, Drawer, ThemeProvider} from "@mui/material";
import noImage from "../images/no-image.png";
import Typography from "@mui/material/Typography";
import {MainButton} from "../MainButton";
import IconButton from "@mui/material/IconButton";
import {FavoriteBorderOutlined, Notifications, Share, Star, Stars} from "@material-ui/icons";
import {FlagOutlined} from "@ant-design/icons";
import React from "react";
import Button from '@mui/material/Button';
import {createTheme} from "@mui/material/styles";

export default function ShopItemList({data}) {
    return (
        <>
            <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={2} lg={2}>
                        <Grid direction="column" marginBottom={5} container columns={{xs: 4, md: 8}}>
                            <Typography variant="h6" gutterBottom>
                                {data.name}
                            </Typography>
                            <Typography color='#ba0438' variant="secondary">{data.city} </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <Grid direction="column" marginBottom={5} container columns={{xs: 3, md: 8}}>
                            <Grid container marginBottom={2} columns={{xs: 4, md: 12}}>
                                <Button style={{
                                    borderRadius: 25,
                                    backgroundColor: "#21b6ae",
                                    padding: "5px 10px",
                                    marginLeft: "6px",
                                    fontSize: "14px",
                                    color: "white",
                                }} variant="contained">{JSON.stringify(data.year)} سال در تربچه</Button>
                                <Button style={{
                                    borderRadius: 25,
                                    backgroundColor: "#d9d9d9",
                                    padding: "5px 10px",
                                    fontSize: "12px",
                                    color: "black",
                                }} variant="contained">
                                    <FlagOutlined fontSize="small"/>
                                    گزارش مشکل
                                </Button>
                            </Grid>
                            <Typography>{data.product_name}</Typography>
                            <Typography variant="subtitle2" color="grey">{data.description}</Typography>
                        </Grid>
                    </Grid>


                    <Grid dir="ltr" item xs={6} md={6} lg={6} >
                        <Grid direction="column" marginBottom={5} container columns={{xs: 3, md: 8}}>
                            <Grid container marginBottom={2} columns={{xs: 4, md: 12}}>

                            </Grid>
                            <Typography dir="rtl" textAlign="left" color="#ba0438">  {JSON.stringify(data.product_price)} تومان </Typography>
                            <Button style={{
                                borderRadius: 5,
                                borderColor: "#ba0438",
                                fontSize: "14px",
                                color: "#ba0438",
                                fontWeight: "bold",
                                border: '2px solid',
                                width: "100px",
                                '&:hover': {
                                    backgroundColor: '#450115',
                                },
                            }} variant="outlined">خرید</Button>
                            <Typography variant="subtitle1" color="grey">{data.lastModified} :آخرین تغییر قیمت </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}