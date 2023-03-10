import * as React from "react";
import ShopItemList from "../shop/ShopItemList";
import shops from "../../static/shops.json"
import {Drawer, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export default function ProductShopsList({shops}) {
    // const cards = shops.shops;
    return (
        <div>
            {shops.map((card) => (
                <>
                    <ShopItemList data={card}/>
                    <Divider/>
                </>
            ))}
        </div>
    )
}