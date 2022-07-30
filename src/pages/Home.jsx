import React, {useContext, useEffect, useRef, useState} from 'react';
import {Categories} from "../component/categories/Categories";
import {list, Sort} from "../component/sort/Sort";
import {PizzaSkeleton} from "../component/pizza_block/PizzaSkeleton";
import {PizzaBlock} from "../component/pizza_block/PizzaBlock";
import {Pagination} from "../component/pagination/Pagination";
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {
    setCategoryId,
    setCurrentPage,
    setFilters
} from "../redux/slice/filterSlice";
import axios from "axios";
import qs from "qs"
import {useNavigate} from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const categoryId = useSelector(state => state.filter.categoryId)
    const sort = useSelector(state => state.filter.sort)
    const currentPage = useSelector(state => state.filter.currentPage)

    const {searchValue} = useContext(SearchContext)
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const onClickCategory = (id) => {
        dispatch(setCategoryId(id))
    }
    const onChangePage = (page) => {
        dispatch(setCurrentPage(page));
    };

    const fetchPizzas = () => {
        setIsLoading(true)

        const url = "https://62d57f1515ad24cbf2c86df6.mockapi.io/items?"
        const sortBy = sort.sortProperty.replace("_", "")
        const order = sort.sortProperty.includes("_",) ? "asc" : "desc";
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `search=${searchValue}` : ''

        axios.get(`${url}page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`)
            .then(res => {
                setItems(res.data)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true
    }, [categoryId, sort.sortProperty, currentPage]);

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = list.find(obj => obj.sortProperty === params.sortProperty);
            dispatch(setFilters({
                ...params,
                sort,
            }),
            );
            isSearch.current = true
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            fetchPizzas()
        }
        isSearch.current = false
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    const skeletons = [...new Array(4)].map((_, i) => <PizzaSkeleton
        key={i}/>)

    const pizzas = items.map((obj) => {
        return <PizzaBlock
            key={obj.id}
            {...obj}
        />
    })

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId}
                            onClickCategory={onClickCategory}/>
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>
            <Pagination currentPage={currentPage}
                        onChangePage={onChangePage}/>
        </div>
    );
};
