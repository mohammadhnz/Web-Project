import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import products from "../../static/products.json"
import {FavoriteBorderOutlined, Notifications} from "@material-ui/icons";
import IconButton from "@mui/material/IconButton";
import noImage from "../images/no-image.png";
import {CardActionArea} from "@mui/material";
import {useState} from "react";
import axios from "axios";


// const cards = products.products.data.items;

const theme = createTheme();

export default function ProductList({productData, isLogged}) {
    const navigate = useNavigate()
    const [product, setProduct] = useState()

    const getProductData = async (url) => {
        // TODO: get real product data
        return axios({
            method: 'get',
            url: url,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },

        }).then(function (response) {
            console.log("product detail", response);
            // setProduct(response.data)
            return response.data
        }).catch(function (error) {
            console.log(error);
        });
        console.log("hello")
        // const data = products.products.data.items;
        // const product = data.find(({id}) => id === product_url);
        // console.log(product)
    }

    const handleGoToPageProduct = async (event) => {
        // console.log("pro url ")
        // console.log(event.currentTarget)
        // console.log("current event url", event.currentTarget.value)
        const p = await getProductData(event.currentTarget.value)
        console.log("product fucking data", p)
        navigate("/products/productPage", {
            state: {
                product: p,
                isLogged: isLogged
            }
        })
    }

    return (
        <ThemeProvider theme={theme}>
            {/*<CssBaseline />*/}
            {/*<main>*/}
            <Container sx={{py: 1}} maxWidth="md">
                <Grid container spacing={2}>
                    {productData.map((card, index) => (
                        <Grid item key={index} xs={12} sm={6} md={3}>
                            <Card
                                sx={{height: '100%', display: 'flex', flexDirection: 'column'}}
                            >
                                <CardActionArea value={card.product_url} onClick={handleGoToPageProduct}>
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            // 16:9
                                            pt: '60',
                                        }}
                                        image={card.product_image_url}
                                        alt="random"
                                    />
                                    <CardContent sx={{flexGrow: 1}}>
                                        <Typography gutterBottom variant="h6" component="h4">
                                            {card.name}
                                        </Typography>
                                        <Typography variant="subtitle2" gutterBottom>
                                            {card.price} تومان
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <IconButton>
                                        <Notifications/>
                                    </IconButton>
                                    <IconButton>
                                        <FavoriteBorderOutlined/>
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            {/*</main>*/}
        </ThemeProvider>
    );
}