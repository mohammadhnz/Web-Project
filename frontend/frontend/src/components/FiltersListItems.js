import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import {AttachMoney, Category, ExpandLess, ExpandMore} from "@material-ui/icons";
import List from "@mui/material/List";
import {useState} from "react";
import {Box, Checkbox, TextField} from "@mui/material";
import categories from "../static/productCategories.json";
import newProductsFilterTest from "../static/products2.json";
import allProducts from "../static/products.json";
import Grid from "@mui/material/Grid";
import {MainButton} from "./MainButton";
import axios from "axios";


export default function FiltersListItem({productData, setProductData}) {
    const [openBrand, setOpenBrand] = useState(true);
    const [openCategory, setOpenCategory] = useState(true);
    const [openPrice, setOpenPrice] = useState(true);
    const [showAvailable, setShowAvailable] = useState(true);
    const [fromPriceField, fromPriceSet] = useState(0)
    const [toPriceField, toPriceSet] = useState(0)

    const categoriesNames = categories.categories;
    const handleClickBrand = () => {
        setOpenBrand(!openBrand);
    };
    const handleClickCategory = () => {
        setOpenCategory(!openCategory);
    };
    const handleClickPrice = () => {
        setOpenPrice(!openPrice);
    };

    const getProductsPriceFilterResult = () => {
        // TODO: get api for search results
        if (fromPriceField === 0) {
            axios({
                method: 'get',
                url: 'https://bd90-31-56-230-17.eu.ngrok.io/product/list',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                },
                params: {
                    price__lt: toPriceField,
                }
            }).then(function (response) {
                console.log("search result response in search", response);
                setProductData(response.data.items)
            }).catch(function (error) {
                console.log(error);
            });

        } else if (toPriceField === 0) {
            axios({
                method: 'get',
                url: 'https://bd90-31-56-230-17.eu.ngrok.io/product/list',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                },
                params: {
                    price__gt: fromPriceField,
                    // price__lt: toPriceField,
                }
            }).then(function (response) {
                console.log("search result response in search", response);
                setProductData(response.data.items)
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            axios({
                method: 'get',
                url: 'https://bd90-31-56-230-17.eu.ngrok.io/product/list',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                },
                params: {
                    price__gt: fromPriceField,
                    price__lt: toPriceField,
                }
            }).then(function (response) {
                console.log("search result response in search", response);
                setProductData(response.data.items)
            }).catch(function (error) {
                console.log(error);
            });
        }
        // return newProductsFilterTest.products.data.items;
    }

    const getProductAvailable = () => {
        // TODO: get api for search results
        return newProductsFilterTest.products.data.items;
    }

    const getAllProducts = () => {
        // TODO: get api for search results
        return allProducts.products.data.items;
    }

    const handleSubmitPrice = (event) => {
        event.preventDefault();
        console.log(toPriceField)
        console.log(fromPriceField)
        getProductsPriceFilterResult()
        // setProductData(newProductList)
    }

    const handleShowAvailable = (event) => {
        if (showAvailable) {
            setProductData(getProductAvailable())
            setShowAvailable((prevState => !prevState))
        } else {
            setProductData(getAllProducts())
            setShowAvailable((prevState => !prevState))
        }
    }

    return (
        <>
            <ListItemButton onClick={handleClickCategory}>
                <ListItemIcon>
                    <Category/>
                </ListItemIcon>
                <ListItemText primary="دسته بندی های پیشنهادی"/>
                {openCategory ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={openCategory} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {categoriesNames.map((category) => (
                        <ListItemButton sx={{pl: 4}}>
                            <ListItemText style={{display: 'flex', justifyContent: 'flex-startnp'}}
                                          primary={category.name}/>
                        </ListItemButton>
                    ))}
                </List>
            </Collapse>


            <ListItemButton onClick={handleClickPrice}>
                <ListItemIcon>
                    <AttachMoney/>
                </ListItemIcon>
                <ListItemText primary="قیمت"/>
                {openPrice ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={openPrice} timeout="auto" unmountOnExit>
                <form onSubmit={handleSubmitPrice}>
                    <Grid container spacing={0.6}>
                        <Grid item xs={5.5}>
                            <TextField label="از" variant="outlined" size="small"
                                       onChange={(e) => fromPriceSet(e.target.value)}/>
                        </Grid>
                        <Grid item xs={5.5}>
                            <TextField label="تا" variant="outlined" size="small"
                                       onChange={(e) => toPriceSet(e.target.value)}/>
                        </Grid>
                    </Grid>
                    <Box
                        m={2}
                        //margin
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        // sx={boxDefault}
                    >
                        <MainButton type="submit" variant="contained" color="primary" sx={{height: 40}}>
                            اعمال فیلتر قیمت
                        </MainButton>
                    </Box>
                </form>
            </Collapse>


            <ListItemButton>
                <ListItemIcon>
                    <Checkbox
                        checked={showAvailable}
                        onChange={handleShowAvailable}
                        inputProps={{'aria-label': 'controlled'}}
                        disableRipple
                    />
                </ListItemIcon>
                <ListItemText primary="نمایش کالاهای موجود"/>

            </ListItemButton>


        </>
    )
}
