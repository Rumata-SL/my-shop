import React, { useEffect, useRef} from 'react';
import {Categories} from "../component/categories/Categories";
import {list, Sort} from "../component/sort/Sort";
import {PizzaSkeleton} from "../component/pizza_block/PizzaSkeleton";
import {PizzaBlock} from "../component/pizza_block/PizzaBlock";
import {Pagination} from "../component/pagination/Pagination";
import {useSelector} from "react-redux";
import {
    selectFilter,
    setCategoryId,
    setCurrentPage,
    setFilters
} from "../redux/slice/filterSlice";
import qs from "qs"
import {useNavigate} from "react-router-dom";
import {
    fetchPizzas,
    SearchPizzaParams,
    selectPizza
} from "../redux/slice/pizzasSlice";
import {useAppDispatch} from "../redux/store";

export const Home = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const {items, status} = useSelector(selectPizza)
    const {categoryId, currentPage, sort, searchValue} = useSelector(selectFilter)

    const onClickCategory = (id:number) => {
        dispatch(setCategoryId(id))
    }
    const onChangePage = (page:number) => {
        dispatch(setCurrentPage(page));
    };

    const getPizzas = () => {
        const sortBy = sort.sortProperty.replace("_", "")
        const order = sort.sortProperty.includes("_",) ? "asc" : "desc";
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `search=${searchValue}` : ''

        dispatch(
            fetchPizzas({
            sortBy,
            order,
            category,
            search,
            currentPage: String(currentPage),
        }));
        window.scrollTo(0, 0);
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
            const sort = list.find(obj => obj.sortProperty === params.sortBy);
            if(sort){
                params.sort = sort
            }
            //@ts-ignore
            dispatch(setFilters({
                    ...params,
                    sort: sort ? sort : list[0],
                }),
            );
            isSearch.current = true
        }
    }, [])

    useEffect(() => {
        // getPizzas()
        // window.scrollTo(0, 0);

        if (!isSearch.current) {
            getPizzas()
        }
        isSearch.current = false
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    const skeletons = [...new Array(4)].map((_, i) => <PizzaSkeleton
        key={i}/>)

    /*const pizzas = items.map((obj) => {
        return <Link key={obj.id} to={`/pizza/${obj.id}`}><PizzaBlock

            {...obj}
        /></Link>
    })*/
    type PizzaType = {
        id: string
        price: number
        title: string
        imageUrl: string
        sizes: Array<number>
        types: Array<number>

    }
    const pizzas = items.map((obj:PizzaType) => {
        return <div key={obj.id}><PizzaBlock

            {...obj}
        /></div>
    })

    if (status === 'error') {
        return <div className="content__error-info">
            <h2>Произошла ошибка
                <span>😕</span>
            </h2>
            <p>
                Не удалось получить пиццы
            </p>
        </div>
    }
    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId}
                            onClickCategory={onClickCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    status === 'loading' ? skeletons : pizzas
                }
            </div>
            <Pagination currentPage={currentPage}
                        onChangePage={onChangePage}/>
        </div>
    );
};
