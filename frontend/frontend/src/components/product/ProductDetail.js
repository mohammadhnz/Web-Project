import React, {Component} from "react";
import Typography from "@mui/material/Typography";
import {Box, CardActions, Container} from "@mui/material";
import noImage from "../images/no-image.png";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import {FavoriteBorderOutlined, Notifications, Share} from "@material-ui/icons";
import {MainButton} from "../MainButton";
import {FlagOutlined} from "@ant-design/icons";
import {Image} from "antd";
import {Link as RouterLink} from 'react-router-dom';


export default function ProductDetail({data}) {

    const handleAddToWishlist = data => {

    };

    const handleAddToCartList = data => {

    };

    return (
        <>
            <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={2} lg={3} alignContent="center">
                        {/*<Box*/}
                        {/*    component="img"*/}
                        {/*    sx={{*/}
                        {/*        width: 150,*/}
                        {/*        height: 150,*/}
                        {/*    }}*/}
                        {/*    src={noImage}*/}
                        {/*    alt="Product Image"*/}
                        {/*>*/}
                        {/*</Box>*/}
                        <Image sx={{
                            width: 120,
                            height: 120,
                        }} src={data.product_image_url} className="githubIcon"/>
                    </Grid>
                    <Grid item xs={12} md={8} lg={8}>
                        <Grid
                            container
                            direction="column"
                            marginBottom={5}
                        >
                            <Typography variant="h6" gutterBottom>
                                {data.name}
                            </Typography>
                            <Typography color='#ba0438' variant="ا7">{data.price} تومان </Typography>
                        </Grid>

                        <Grid container columns={{xs: 4, md: 12}}>
                            <RouterLink component={<MainButton/>} to={data.best_redirect_url} variant="contained" color="primary" sx={{height: 40, width: 250}}>
                                خرید از ارزان ترین فروشنده
                            </RouterLink>
                            <IconButton title="به من اطلاع بده">
                                <Notifications/>
                            </IconButton>
                            <IconButton title="مورد علاقه">
                                <FavoriteBorderOutlined/>
                            </IconButton>
                            <IconButton title="اشتراک گذاری">
                                <Share/>
                            </IconButton>
                            <IconButton title="گزارش مشکل">
                                <FlagOutlined/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>

            </Container>
        </>
    );
}

