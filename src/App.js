import React from "react";
import "./scss/app.scss"
import {Header} from "./component/Header";
import {Categories} from "./component/Categories";
import {Sort} from "./component/Sort";
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
                        <PizzaBlock price={500} title={"Маргарита"}/>
                        <PizzaBlock price={400} title={"Сыр бекон"}/>
                        <PizzaBlock price={500} title={"Маргарита"}/>
                        <PizzaBlock price={400} title={"Сыр бекон"}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
