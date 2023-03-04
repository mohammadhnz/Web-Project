import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import {ExpandLess, ExpandMore, StarBorder} from "@material-ui/icons";
import List from "@mui/material/List";
import {useState} from "react";
import {Checkbox} from "@mui/material";
import Search from "../forms/Search";
import categories from "../static/productCategories.json";
import SearchInNav from "../forms/SearchInNav";


export default function FiltersListItem() {
    const [openBrand, setOpenBrand] = useState(true);
    const [openCategory, setOpenCategory] = useState(true);
    const [openPrice, setOpenPrice] = useState(true);
    const [showAvailable, setShowAvailable] = useState(true);
    const handleClickBrand = () => {
        setOpenBrand(!openBrand);
    };
    const handleClickCategory = () => {
        setOpenCategory(!openCategory);
    };
    const handleClickPrice = () => {
        setOpenPrice(!openPrice);
    };

    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    return (
        <>

            <ListItemButton onClick={handleClickBrand}>
                <ListItemText primary="انتخاب برند"/>
                {openBrand ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={openBrand} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <SearchInNav />
                    <ListItemButton sx={{pl: 4}}>
                        <ListItemIcon>
                            <StarBorder/>
                        </ListItemIcon>
                        <ListItemText primary="انتخاب برند"/>
                    </ListItemButton>
                </List>
            </Collapse>

            <ListItemButton onClick={handleClickCategory}>
                <ListItemText primary="دسته بندی های پیشنهادی"/>
                {openCategory ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={openCategory} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{pl: 4}}>
                        <ListItemIcon>
                            <StarBorder/>
                        </ListItemIcon>
                        <ListItemText primary="دسته بندی های پیشنهادی"/>
                    </ListItemButton>
                </List>
            </Collapse>


            <ListItemButton onClick={handleClickPrice}>
                <ListItemText primary="قیمت"/>
                {openPrice ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={openPrice} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{pl: 4}}>
                        <ListItemIcon>
                            <StarBorder/>
                        </ListItemIcon>
                        <ListItemText primary="قیمت"/>
                    </ListItemButton>
                </List>
            </Collapse>


            <ListItemButton  onClick={handleToggle(0)}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={checked.indexOf(0) !== -1}
                        tabIndex={-1}
                        disableRipple
                    />
                </ListItemIcon>
                <ListItemText primary="نمایش کالاهای موجود"/>

            </ListItemButton>


        </>
    )
}
