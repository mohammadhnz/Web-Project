import React, {useState} from "react";
import {
    FormControl,
    InputAdornment,
    TextField,
    createStyles,
    makeStyles
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {Autocomplete, Box} from "@mui/material";
import productCategories from "../static/productCategories.json"
import products from "../static/products.json";


const useStyles = makeStyles(() => {
    return createStyles({
        search: {
            margin: "0"
        }
    });
});

export default function SearchInNav() {
    const {search} = useStyles();
    const options = productCategories.categories;
    console.log(options)
    const defaultProps = {
        options: options,
        getOptionLabel: (option) => option.name
    };

    const [showClearIcon, setShowClearIcon] = useState("none");

    const handleChange = (event) => {
        setShowClearIcon(event.target.value === "" ? "none" : "flex");
    };

    const handleClick = () => {

    };

    return (
        <div dir='rtl' className="rmdp-rtl">
            <FormControl className="rmdp-rtl">
                <Box sx={{display: 'flex', alignItems: 'flex-end', m: 1, mt: 1}}>
                    {/*<SearchIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>*/}
                    <Autocomplete
                        {...defaultProps}
                        autoHighlight
                        sx={{width: 220}}
                        variant="standard"
                        onChange={handleChange}
                        renderInput={(params) => (
                            <TextField {...params} placeholder="نام برند" id="input-with-icon-textfield"
                                       variant="outlined">
                                )}
                            </TextField>
                        )}
                    />
                </Box>
            </FormControl>
        </div>
    );
};


