import React, {FunctionComponent, useState} from "react";
import {
    FormControl,
    InputAdornment,
    TextField,
    createStyles,
    makeStyles
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import {Autocomplete, Box} from "@mui/material";

const useStyles = makeStyles(() => {
    return createStyles({
        search: {
            margin: "0"
        }
    });
});

export default function Search({data}) {
    const {search} = useStyles();
    const options = data;
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
                <Box sx={{ display: 'flex', alignItems: 'flex-end' ,m: 1, mt: 3 }}>
                    <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <Autocomplete
                        {...defaultProps}
                        autoHighlight
                        sx={{ width: 300 }}
                        variant="standard"
                        onChange={handleChange}
                        renderInput={(params) => (
                            <TextField {...params} placeholder="نام کالا را وارد کنید" id="to-field"
                                       variant="standard">
                                )}
                            </TextField>
                        )}
                    />
                </Box>
            </FormControl>
        </div>
    );
};


