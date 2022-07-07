import "./scss/app.scss"
import React from "react";
import {Header} from "./component/header/Header";
import {Home} from "./pages/Home";
import {NotFound} from "./pages/NotFound";
import { Routes, Route} from "react-router-dom";
import {Cart} from "./pages/Cart";



export function App() {
    //https://62c5ec33134fa108c25fac28.mockapi.io/items


    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="*" element={<NotFound/>} />
                    </Routes>

                </div>
            </div>
        </div>
    );
}

/*
{
    items.map((obj) => {
        return <PizzaBlock
            key={obj.id}
            price={obj.price}
            title={obj.title}
            imageUrl={obj.imageUrl}
            sizes={obj.sizes}
            types={obj.types}
        />
    })
}*/
