import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Search from "../forms/Search";
import {BottomNavigationAction} from "@mui/material";
import logo from "./images/beet.png";
import {MainButton} from "./MainButton";

function Header(props) {
    const {sections, title, isInHome, data} = props;
    return (
        <div className=" rmdp-rtl">
            <React.Fragment>
                <Toolbar sx={{borderBottom: 1, borderColor: 'divider'}}>
                    {!isInHome && (
                        //if you want to show an error message
                        <Search data={data}/>
                    )}
                    <span className="material-icons"><img src={logo} width='60' alt='\'/></span>
                    <Typography
                        component="h2"
                        variant="h4"
                        color="#8f032b"
                        align="center"
                        noWrap
                        sx={{flex: 1}}
                    >
                        {title}
                    </Typography>
                    <MainButton variant="contained" size="small">
                        ثبت نام/ورود
                    </MainButton>
                </Toolbar>
                <Toolbar
                    component="nav"
                    variant="dense"
                    sx={{justifyContent: 'space-between', overflowX: 'auto'}}
                >
                    {sections.map((section) => (
                        <Link
                            color="inherit"
                            noWrap
                            key={section.title}
                            variant="body2"
                            href={section.url}
                            sx={{p: 1, flexShrink: 0}}
                            underline="none"
                        >
                            {section.title}
                        </Link>
                    ))}
                </Toolbar>
            </React.Fragment>
        </div>
    );
}

Header.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }),
    ).isRequired,
    title: PropTypes.string.isRequired,
};

export default Header;