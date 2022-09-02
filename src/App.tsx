//https://62c5ec33134fa108c25fac28.mockapi.io/items
import "./scss/app.scss"
import React, {Suspense} from "react";
import {Home} from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import {MainLayout} from "./layouts/MainLayout";

const Cart = React.lazy(() => import(/*webpackChunkName: "Cart"*/"./pages/Cart"))
const FullPizza = React.lazy(() => import(/*webpackChunkName: "FullPizza"*/"./pages/FullPizza"))
const NotFound = React.lazy(() => import(/*webpackChunkName: "NotFound"*/"./pages/NotFound"))

export function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route path="" element={<Home/>}></Route>
                <Route path="cart" element={
                    <Suspense fallback={<div>Идет
                        загрузка...</div>}><Cart/></Suspense>}></Route>
                <Route path="pizza/:id" element={
                    <Suspense fallback={
                        <div>Загрузка</div>}><FullPizza/></Suspense>}></Route>
                <Route path="*" element={<Suspense fallback={
                    <div>Загрузка</div>}><NotFound/></Suspense>}></Route>
            </Route>
        </Routes>
    );
}

