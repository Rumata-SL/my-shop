import React, {useEffect, useState} from 'react';
import {Categories} from "../component/categories/Categories";
import {Sort} from "../component/sort/Sort";
import {PizzaSkeleton} from "../component/pizza_block/PizzaSkeleton";
import {PizzaBlock} from "../component/pizza_block/PizzaBlock";

export const Home = () => {

    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [categoryId, setCategoryId] = useState(0)
    const [sortType, setSortType] = useState({
        name: "популярности",
        sortProperty: "rating"
    })

    const onClickCategory = (id) => {
        setCategoryId(id)
    }

    const onChangeSort = (id) => {
        setSortType(id)
    }

    const url = "https://62c5ec33134fa108c25fac28.mockapi.io/items?"
    const category = categoryId > 0 ? `category=${categoryId}` : ""
    const order = sortType.sortProperty.includes("_",) ? "asc" : "desc";
    const sortBy = sortType.sortProperty.replace("_", "")

    useEffect(() => {
        setIsLoading(true)
        fetch(`${url}${category}&sortBy=${sortBy}&order=${order}`)
            .then(res => res.json())
            .then(res => {
                setItems(res)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType])

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId}
                            onClickCategory={onClickCategory}/>
                <Sort sortType={sortType} onChangeSort={onChangeSort}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? [...new Array(6)].map((_, i) => <PizzaSkeleton
                            key={i}/>)
                        : items.map((obj) => <PizzaBlock
                            key={obj.id}
                            price={obj.price}
                            title={obj.title}
                            imageUrl={obj.imageUrl}
                            sizes={obj.sizes}
                            types={obj.types}
                        />)}
            </div>
        </div>
    );
};
