import * as React from 'react';
import {styled, createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Header from "../components/Header";
import ListSubheader from "@mui/material/ListSubheader";
import FiltersListItem from "../components/FiltersListItems";
import categories from "../static/productCategories.json"
import products from "../static/products.json"
import ProductList from "../components/product/ProductList";


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

export default function ProductSearchResults() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <div dir="rtl">
            <Header title="تربچه" sections={sections} isInHome={false} data={products.products.data.items} isLogged={false}/>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{display: 'flex'}}>
                    <CssBaseline/>
                    <Drawer variant="permanent" open={open}>
                        <Toolbar
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                // justifyContent: 'flex-end',
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
                            <FiltersListItem/>
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
                        {/*<Container maxWidth="lg" sx={{mt: 4, mb: 4}}>*/}
                        {/*    <Grid container spacing={1}>*/}
                        {/*        /!* Recent Orders *!/*/}
                        {/*        <Grid item xs={12}>*/}
                                    <Box sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                                        <ProductList/>
                                    </Box>
                        {/*        </Grid>*/}
                        {/*    </Grid>*/}

                        {/*</Container>*/}
                    </Box>
                </Box>
            </ThemeProvider>
        </div>
    );
}
