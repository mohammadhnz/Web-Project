import React, {useState} from "react";
import {ReactSearchAutocomplete} from "react-search-autocomplete";

import {
    FormControl,
    createStyles,
    makeStyles
} from "@material-ui/core";
import {useNavigate} from "react-router";

const useStyles = makeStyles(() => {
    return createStyles({
        search: {
            margin: "0"
        }
    });
});

export default function Search({data}) {
    const [productName, setProductName] = useState("")
    const [searchResult, setSearchResult] = useState("");
    const navigate = useNavigate();


    const getProductSearchResult = () => {
        // TODO: get search request
    }

    const handleOnSelect = (item) => {
        setProductName(item.name)
        console.log("final select", item.name)
        getProductSearchResult()
        navigate('/products', {
            state: {
                productName: productName,
            }
        });
    };

    const handleOnSearch = (string, results) => {
        setSearchResult(string)
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setProductName(searchResult)
            console.log("final search", searchResult)
            getProductSearchResult()
            navigate('/products', {
                state: {
                    productName: productName,
                }
            });
        }
    }

    const handleOnFocus = () => {
        console.log("Focused");
    };

    const handleOnClear = () => {
        console.log("Cleared");
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
                <div style={{width: 300, margin: 10, }} onKeyPress={handleKeyPress}>
                    <ReactSearchAutocomplete
                        items={data}
                        onSearch={handleOnSearch}
                        // onHover={handleOnHover}
                        onSelect={handleOnSelect}
                        onFocus={handleOnFocus}
                        onClear={handleOnClear}
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


