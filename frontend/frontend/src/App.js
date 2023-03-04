import React, {useEffect, lazy, Suspense} from "react";
import {Router, Route, BrowserRouter, Routes} from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductSearchResults from "./pages/ProductSearchResults";
import Test from "./Test";

// const Home = lazy(() => import("./pages/Home"));


const App = () => {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/*<Route exact path="/" element={<Test/>}/>*/}
                    <Route exact path="/" element={<Home/>}/>
                    <Route path="products" element={<ProductSearchResults/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;