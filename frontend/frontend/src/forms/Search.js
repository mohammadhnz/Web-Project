import React, {useState} from "react";
import {ReactSearchAutocomplete} from "react-search-autocomplete";
import {
    FormControl,
    InputAdornment,
    TextField,
    createStyles,
    makeStyles
} from "@material-ui/core";

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

    const formatResult = (item) => {
        console.log(item);
        return (
            <div className="result-wrapper">
                <span className="result-span">{item.name}</span>
            </div>
        );
    };

    return (
        <div>
            <FormControl>
                <div style={{width: 300, margin: 10}}>
                    <ReactSearchAutocomplete
                        items={data}
                        // onSearch={handleOnSearch}
                        // onHover={handleOnHover}
                        // onSelect={handleOnSelect}
                        // onFocus={handleOnFocus}
                        // onClear={handleOnClear}
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


