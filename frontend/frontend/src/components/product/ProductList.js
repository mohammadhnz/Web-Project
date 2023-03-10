import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink } from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import products from "../../static/products.json"
import {FavoriteBorderOutlined, Notifications} from "@material-ui/icons";
import IconButton from "@mui/material/IconButton";
import noImage from "../images/no-image.png";
import {CardActionArea} from "@mui/material";


// const cards = products.products.data.items;

const theme = createTheme();

export default function ProductList({productData}) {
    const handleGoToPageProduct = () => {

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
                                <CardActionArea component={RouterLink} to="/products/productPage" state={{
                                    product_id: card.id,
                                }}>
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            // 16:9
                                            pt: '60',
                                        }}
                                        image={noImage}
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