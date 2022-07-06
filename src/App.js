import "./scss/app.scss"
import React from "react";
import {Sort} from "./component/Sort";
import pizzas from "./assets/pizza.json"
import {Header} from "./component/Header";
import {Categories} from "./component/Categories";
import {PizzaBlock} from "./component/PizzaBlock";



export function App() {
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
                            pizzas.map((obj)=>{
                                return <PizzaBlock
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
