import * as React from 'react';
import {styled, createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Header from "../components/Header";
import FiltersListItem from "../components/FiltersListItems";
import products from "../static/products.json"
import products2 from "../static/products2.json"
import ProductList from "../components/product/ProductList";
import {useEffect} from "react";
import {useState} from "react";


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

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(8),
                },
            }),
        },
    }),
);

const mdTheme = createTheme({
    direction: 'rtl',
});

const productSampleData = {
    product_url: "/product/detail/qAzwSx3Ed6Yh",
    product_image_url: "",
    shop_count: 3,
    name: "موبایل آیفون xs max 64Gb",
    price: " 12,000,000 تومان",
    is_available: true,
    updated: "12 دقیقه پیش"
}

export default function ProductSearchResults() {
    const [open, setOpen] = React.useState(true);
    // const [productData, setProductData] = useState([]);
    // TODO: uncomment above and remove below
    const [productData, setProductData] = useState(products.products.data.items);
    console.log("product data: ", productData)
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const getProductsSearchResult = () => {
        // TODO: get api for search results
    }

    useEffect(() => {
        getProductsSearchResult()
    }, [])


    return (
        <div dir="rtl">
            <Header title="تربچه" sections={sections} isInHome={false} data={products.products.data.items}
                    isLogged={false}/>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{display: 'flex'}}>
                    <CssBaseline/>
                    <Drawer variant="permanent" open={open}>
                        <Toolbar
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                px: [1],
                            }}
                        >
                            <IconButton onClick={toggleDrawer}>
                                <ChevronLeftIcon/>
                            </IconButton>
                        </Toolbar>
                        <Divider/>
                        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
                              component="nav"
                              aria-labelledby="nested-list-subheader">
                            <FiltersListItem productData={productData} setProductData={setProductData}/>
                        </List>
                    </Drawer>
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

                        <Box sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                            <ProductList productData={productData}/>
                        </Box>
                    </Box>
                </Box>
            </ThemeProvider>
        </div>
    );
}
