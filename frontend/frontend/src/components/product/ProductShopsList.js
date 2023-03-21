import * as React from "react";
import ShopItemList from "../shop/ShopItemList";
import Divider from "@mui/material/Divider";

export default function ProductShopsList({shops}) {
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