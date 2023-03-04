import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";

export const MainButton = styled(Button)(({theme}) => ({
        color: theme.palette.getContrastText('#8f032b'),
        backgroundColor: "#8f032b",
        '&:hover': {
            backgroundColor: '#450115',
        },
    }));