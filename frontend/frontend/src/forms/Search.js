import React, {useState} from "react";
import {ReactSearchAutocomplete} from "react-search-autocomplete";
import products from "../static/products.json"
import {
    FormControl,
    createStyles,
    makeStyles
} from "@material-ui/core";
import {useNavigate} from "react-router";
import axios from "axios";

const useStyles = makeStyles(() => {
    return createStyles({
        search: {
            margin: "0"
        }
    });
});

export default function Search({data, isLogged, setProductData, isHome}) {
    const [productName, setProductName] = useState("")
    const [productGetRes, setProductGetRes] = useState([])
    const navigate = useNavigate();

// https://2525-31-56-237-194.eu.ngrok.io/product/list?name=samsung&price__lt=10000000&price__gt=50&category_id=3
    const getProductSearchResult = (name) => {
        // TODO: get search request
        axios({
            method: 'get',
            url: 'https://2525-31-56-237-194.eu.ngrok.io/product/list',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },
            params: {
                name: name,
            }
        }).then(function (response) {
            console.log("product name in search", productName);
            setProductGetRes(response.data.items)
            // if (isHome) {
                navigate("/products", {
                        state: {
                            isHome: false,
                            isLogged: isLogged,
                            productName: productName,
                        }
                    }
                )
            // } else {
            //     console.log("im setting", response.data.items)
            //     setProductData(response.data.items)
            // }
        }).catch(function (error) {
            console.log(error);
        });
    }



    const handleOnSearch = (string, results) => {
        setProductName(string)
        // getProductSearchResult(string)
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setProductName(productName)
            getProductSearchResult(productName)
        }
    }

    const handleOnFocus = () => {
        // console.log("Focused");
    };

    const handleOnClear = () => {
        // console.log("Cleared");
    };

    const formatResult = (item) => {
        return (
            <div className="result-wrapper">
                <span className="result-span">{item.name}</span>
            </div>
        );
    };

    return (
        <div>
            <FormControl style={{zIndex: 1}}>
                <div style={{width: 300, margin: 10,}} onKeyPress={handleKeyPress}>
                    <ReactSearchAutocomplete
                        items={data}
                        onSearch={handleOnSearch}
                        // onHover={handleOnHover}
                        // onSelect={handleOnSelect}
                        styling={{zIndex: 1, border: '2px solid #8f032b'}}
                        formatResult={formatResult}
                        autoFocus
                    />
                </div>
                {/*</Box>*/}
            </FormControl>
        </div>
    );
};


