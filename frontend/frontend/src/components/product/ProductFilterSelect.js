import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import newProductsFilterTest from "../../static/products2.json";
import axios from "axios";

export default function ProductFilterSelect({field, setField, fieldItems, setProductData}) {
    const getNewest = () => {
        // TODO: get api for search results
        axios({
            method: 'get',
            url: 'https://bd90-31-56-230-17.eu.ngrok.io/product/list',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },
            params: {
                sort: 'date_updated+',
            }
        }).then(function (response) {
            console.log("get newest product response", response);
            return response.data.items
        }).catch(function (error) {
            console.log(error);
            return newProductsFilterTest.products.data.items
        });
        return newProductsFilterTest.products.data.items
    }

    const getLowestPrice = () => {
        // TODO: get api for search results
        axios({
            method: 'get',
            url: 'https://bd90-31-56-230-17.eu.ngrok.io/product/list',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },
            params: {
                sort: 'price-',
            }
        }).then(function (response) {
            console.log("get lowest price response", response);
            return response.data.items
        }).catch(function (error) {
            console.log(error);
            return newProductsFilterTest.products.data.items
        });
        return newProductsFilterTest.products.data.items
    }

    const getHighestPrice = () => {
        // TODO: get api for search results
        return newProductsFilterTest.products.data.items;
    }

    const handleChange = (event) => {
        if (event.target.value === 10) {
            setField(event.target.value);
            setProductData(getNewest())
        } else if (event.target.value === 20) {
            setField(event.target.value);
            setProductData(getLowestPrice())
        } else if (event.target.value === 30) {
            setField(event.target.value);
            setProductData(getHighestPrice())
        }
    };

    return (
        <FormControl sx={{m: 1, minWidth: 120}} size="small">
            <InputLabel id="demo-select-small">فیلتر</InputLabel>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={field}
                label="filter"
                onChange={handleChange}
                sx={{
                    marginRight: 6,
                }}
            >
                <MenuItem key={10} value={10}>{fieldItems[0]}</MenuItem>
                <MenuItem key={20} value={20}>{fieldItems[1]}</MenuItem>
                <MenuItem key={30} value={30}>{fieldItems[2]}</MenuItem>
            </Select>
        </FormControl>
    );
}
