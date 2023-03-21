import * as React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Header from "../components/Header";
import Chart from "../components/product/Chart";
import ProductDetail from "../components/product/ProductDetail";
import {useLocation} from 'react-router-dom'
import products from "../static/products.json";
import sampleProducts from "../static/products2.json";
import ProductList from "../components/product/ProductList";
import Typography from "@mui/material/Typography";
import ProductShopsList from "../components/product/ProductShopsList";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import {CardActionArea} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import {FavoriteBorderOutlined, Notifications} from "@material-ui/icons";

const drawerWidth = 240;

const sections = [
    {title: 'موبایل و کالای دیجیتال', url: '#'},
    {title: 'لپ‌تاپ، کامپیوتر، اداری', url: '#'},
    {title: 'هایپر مارکت', url: '#'},
    {title: 'لوازم خانگی', url: '#'},
    {title: 'مد و پوشاک', url: '#'},
    {title: 'زیبایی و بهداشت', url: '#'},
    {title: 'صورتی و تصویری', url: '#'},
    {title: 'خودرو و سایر وسایل نقلیه', url: '#'},
    {title: 'سایر دسته ها', url: '#'},
];


const mdTheme = createTheme();


export default function ProductPage() {
    const location = useLocation()
    const {product, isLogged} = location.state
    console.log("in detail page", product)


    const getSimilarProducts = () => {
        // TODO: get similar products for real
        return sampleProducts.products.data.items
    }

    const similar_product_data = getSimilarProducts()

    return (
        <div dir="rtl">
            <Header title="تربچه" sections={sections} isInHome={false} isLogged={isLogged}
                    autoCompeleteData={products.products.data.items}/>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{display: 'flex'}}>
                    <CssBaseline/>
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Toolbar/>
                        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                            <Grid container spacing={3}>
                                {/* Chart */}
                                <Grid item xs={12} md={8} lg={8}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 240,
                                        }}
                                    >
                                        <ProductDetail data={product}/>
                                    </Paper>
                                </Grid>
                                {/* Recent Deposits */}
                                <Grid item xs={12} md={4} lg={4}>
                                    <Paper
                                        sx={{
                                            p: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 240,
                                        }}
                                    >
                                        <Chart/>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={8} lg={8}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 400,
                                            overflow: 'auto'
                                        }}
                                    >
                                        <Typography variant="h6" sx={{
                                            fontWeight: 'bold',
                                        }}>فروشنده ها</Typography>
                                        <ProductShopsList shops={product.shops}/>
                                    </Paper>
                                </Grid>
                                {/* Recent Deposits */}
                                <Grid item xs={12} md={4} lg={4}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 400,
                                            overflow: 'auto'
                                        }}
                                    >
                                        <Typography variant="h6" sx={{
                                            fontWeight: 'bold',
                                        }}> مشخصات {product.name}</Typography>
                                        <Typography variant="subtitle2" sx={{marginTop: 3}}>مشخصات کلی</Typography>
                                        <Divider/>
                                        {product.features.map((feature, index) => (
                                            <Typography>
                                                <Typography fontWeight='bold'>{feature.name} :</Typography>{feature.value}
                                            </Typography>
                                        ))}
                                    </Paper>
                                </Grid>

                                <Grid item xs={12} md={12} lg={12} alignContent="center">
                                    <Typography align="center" alignContent="center" variant="h5">محصولات
                                        مشابه</Typography>
                                    <Box sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                                        <ProductList productData={similar_product_data}/>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>
        </div>
    );
}
