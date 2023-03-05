import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";

export const MainButton = styled(Button)(({theme}) => ({
        color: theme.palette.getContrastText('#ba0438'),
        backgroundColor: "#ba0438",
        '&:hover': {
            backgroundColor: '#450115',
        },
    }));