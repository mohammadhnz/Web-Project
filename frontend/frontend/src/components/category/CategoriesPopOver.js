import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Button from "@mui/material/Button";
import CategoriesInNav from "./CategoriesInNav";
import {Link} from "react-router-dom";

export default function CategoriesPopOver({data, name}) {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'transition-popper' : undefined;

    return (
        <div>
            <Button style={{
                textDecoration: 'none',
                color: "#450115",
                '&:hover': {
                    backgroundColor: '#ff0048',
                    color: '#ff0048',
                    cursor: 'pointer',
                    textColor: '#ff0048',
                    fontWeight: '20'
                },
            }} aria-describedby={id} type="button" onClick={handleClick}>
                {name}
            </Button>
            <Popper id={id} open={open} anchorEl={anchorEl} transition >
                {({TransitionProps}) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Box sx={{ border: 1, borderRadius: 2, p: 1, bgcolor: 'background.paper', maxWidth: 600, overflowY: 'auto'}}>
                            {data.map((d, index) => (
                                <>
                                    <Link
                                        component={<Button/>}
                                        key={index}
                                        style={{
                                            textDecoration: 'none',
                                            color: "#450115",
                                            '&:hover': {
                                                backgroundColor: '#ff0048',
                                                color: '#ff0048',
                                                cursor: 'pointer',
                                                textColor: '#ff0048',
                                                fontWeight: '20'
                                            },
                                        }}>{d.name}</Link>
                                    <CategoriesInNav key={index} data={d.children}/>
                                </>
                            ))}
                        </Box>
                    </Fade>
                )}
            </Popper>
        </div>
    );
}