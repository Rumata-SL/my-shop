//https://62c5ec33134fa108c25fac28.mockapi.io/items
import "./scss/app.scss"
import React from "react";
import {Header} from "./component/header/Header";
import {Home} from "./pages/Home";
import {NotFound} from "./pages/NotFound";
import {Route, Routes} from "react-router-dom";
import {Cart} from "./pages/Cart";
import {FullPizza} from "./pages/FullPizza";
import {MainLayout} from "./layouts/MainLayout";


export function App() {
    return (

        <Routes>

            <Route path="/" element={<MainLayout/>}>
                <Route path="" element={<Home/>}></Route>
                <Route path="cart" element={<Cart/>}></Route>
                <Route path="pizza/:id" element={<FullPizza/>}></Route>
                <Route path="*" element={<NotFound/>}></Route>
            </Route>
        </Routes>

    );
}

