import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import Search from "../forms/Search";
import logo from "./images/beet.png";
import {MainButton} from "./MainButton";
import axios from "axios";
import CategoriesPopOver from "./category/CategoriesPopOver";
import categories from '../static/categoriesWithChild.json'
import {useEffect} from "react";

function Header(props) {

    const getCategories = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: 'https://lemon-weeks-do-31-56-209-97.loca.lt/suggest_origin_destination/?name=',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                    'Bypass-Tunnel-Reminder': 'hey'
                },
            })
            console.log(response.data)
        } catch
            (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])


    const {title, isInHome, data, isLogged} = props;
    const sections = categories.categories;
    const navigate = useNavigate();

    return (
        <div className=" rmdp-rtl">
            <React.Fragment>
                <Toolbar sx={{borderBottom: 1, borderColor: 'divider'}}>
                    {!isInHome && (
                        <Search data={data}/>)}
                    <span className="material-icons">
                    <RouterLink to="/">
                        <img src={logo} alt='logo' width="60"/>
                    </RouterLink>
                </span>
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
                    {!isLogged && (
                        <MainButton variant="contained" size="small" onClick={() => navigate('/sign-up')}>
                            ثبت نام/ورود
                        </MainButton>)}
                    {isLogged && (<MainButton variant="contained" size="small">
                        93571828
                    </MainButton>)}
                </Toolbar>
                <Toolbar
                    component="nav"
                    variant="dense"
                    sx={{justifyContent: 'space-between', overflowX: 'auto', }}
                >
                    {sections.map((section, index) => {
                        return <CategoriesPopOver data={section.children} name={section.name}/>
                    })
                    }
                </Toolbar>
            </React.Fragment>
        </div>);
}

Header.propTypes = {
    sections: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired, url: PropTypes.string.isRequired,
    }),).isRequired, title: PropTypes.string.isRequired,
};

export default Header;