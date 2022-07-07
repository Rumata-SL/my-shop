import "./scss/app.scss"
import React, {useEffect, useState} from "react";
import {Sort} from "./component/Sort";
// import pizzas from "./assets/pizza.json"
import {Header} from "./component/Header";
import {Categories} from "./component/Categories";
import {PizzaBlock} from "./component/PizzaBlock";
import {PizzaSkeleton} from "./component/PizzaSkeleton";


export function App() {
    //https://62c5ec33134fa108c25fac28.mockapi.io/items
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch("https://62c5ec33134fa108c25fac28.mockapi.io/items")
            .then(res => res.json())
            .then(res => {
                setItems(res)
            })
    }, [])


    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories/>
                        <Sort/>
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {
                            items.map((obj) => {
                                return <PizzaSkeleton
                                    key={obj.id}
                                    price={obj.price}
                                    title={obj.title}
                                    imageUrl={obj.imageUrl}
                                    sizes={obj.sizes}
                                    types={obj.types}
                                />
                            })
                        }

                    </div>
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
