import Search from "../forms/Search";
import {Container, CssBaseline, Link, ThemeProvider} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React, {useState} from "react";
import products from "../static/products.json"
import {createTheme} from "@mui/material/styles";

const sections = [
    {title: 'موبایل و کالای دیجیتال', url: '#'},
    {title: 'لپ‌تاپ، کامپیوتر، اداری', url: '#'},
    {title: 'هایپر مارکت', url: '#'},
    {title: 'لوازم خانگی', url: '#'},
    {title: 'مد و پوشاک', url: '#'},
    {title: 'زیبایی و بهداشت', url: '#'},
    {title: 'صورتی و تصویری', url: '#'},
    {title: 'خودرو و سایر وسایل نقلیه', url: '#'},
    {title: 'سایر دسته ها', url: '#'},
];

export default function Home() {
    const theme = createTheme({
        direction: 'rtl',
        zIndex: 2
    });
    return (
        <div dir="rtl">
            <Header title="تربچه" sections={sections} isInHome={true} isLogged={false}
                    data={products.products.data.items}/>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Container align="center">
                    <h3>کالایی که میخواهید را وارد کنید</h3>
                    <Search data={products.products.data.items}/>
                </Container>
                <Footer/>
            </ThemeProvider>
        </div>
    )
}