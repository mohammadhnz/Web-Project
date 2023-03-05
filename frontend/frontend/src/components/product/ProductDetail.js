import React, {Component} from "react";
import Typography from "@mui/material/Typography";
import {Box, CardActions, Container} from "@mui/material";
import noImage from "../images/no-image.png";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import {FavoriteBorderOutlined, Notifications, Share} from "@material-ui/icons";
import {MainButton} from "../MainButton";
import {FlagOutlined} from "@ant-design/icons";

export default function ProductDetail({data}) {

    const handleAddToWishlist = data => {

    };

    const handleAddToCartList = data => {

    };

    return (
        <>
            <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4} lg={4} alignContent="center">
                        <Box
                            component="img"
                            sx={{
                                width: 150,
                                height: 150,
                            }}
                            src={noImage}
                            alt="Product Image"
                        >
                        </Box>
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
                            <MainButton variant="contained" color="primary" sx={{height: 40, width: 250}}>
                                خرید از ارزان ترین فروشنده
                            </MainButton>
                            <IconButton title="به من اطلاع بده">
                                <Notifications/>
                            </IconButton>
                            <IconButton title="مورد علاقه">
                                <FavoriteBorderOutlined/>
                            </IconButton>
                            <IconButton  title="اشتراک گذاری">
                                <Share/>
                            </IconButton>
                            <IconButton  title="گزارش مشکل">
                                <FlagOutlined/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>

            </Container>
        </>
    );
}

