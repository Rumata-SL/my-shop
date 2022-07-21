import React, {useContext, useEffect, useState} from 'react';
import {Categories} from "../component/categories/Categories";
import {Sort} from "../component/sort/Sort";
import {PizzaSkeleton} from "../component/pizza_block/PizzaSkeleton";
import {PizzaBlock} from "../component/pizza_block/PizzaBlock";
import {Pagination} from "../component/pagination/Pagination";
import {SearchContext} from "../App";

export const Home = () => {
    const {searchValue} = useContext(SearchContext)

    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [categoryId, setCategoryId] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
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

    const url = "https://62d57f1515ad24cbf2c86df6.mockapi.io/items?"

    useEffect(() => {
        setIsLoading(true)

        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const order = sortType.sortProperty.includes("_",) ? "asc" : "desc";
        const sortBy = sortType.sortProperty.replace("_", "")
        const search = searchValue ? `&search=${searchValue}` : ''

        fetch(`${url}page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(res => res.json())
            .then(res => {
                setItems(res)
                setIsLoading(false)
            })
        // window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue, currentPage])

    const skeletons = [...new Array(4)].map((_, i) => <PizzaSkeleton
        key={i}/>)

    const pizzas = items.map((obj) => <PizzaBlock
        key={obj.id}
        price={obj.price}
        title={obj.title}
        imageUrl={obj.imageUrl}
        sizes={obj.sizes}
        types={obj.types}
    />)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId}
                            onClickCategory={onClickCategory}/>
                <Sort sortType={sortType} onChangeSort={onChangeSort}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>
            <Pagination onChangePage={(number)=>setCurrentPage(number)}/>
        </div>
    );
};


/*
const pizzas = items.filter(obj => {
    if(obj.title.toLowerCase().includes(searchValue.toLowerCase())){
        return true
    }
    return false
}).map((obj) => <PizzaBlock
    key={obj.id}
    price={obj.price}
    title={obj.title}
    imageUrl={obj.imageUrl}
    sizes={obj.sizes}
    types={obj.types}
/>)*/
