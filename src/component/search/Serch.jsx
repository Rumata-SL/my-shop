import React, {useContext} from 'react';
import style from "./Serch.module.scss"
import iconSearch from "./iconSearch.svg"
import iconClear from "./iconClear.svg"
import {SearchContext} from "../../App";

export const Search = () => {
    const {searchValue, setSearchValue} = useContext(SearchContext)

    return (
        <div className={style.root}>
            <img className={style.icon} src={iconSearch} alt="iconSearch"/>

            <input value={searchValue}
                   onChange={(e) => setSearchValue(e.target.value)}
                   className={style.input} type="text"
                   placeholder="Поиск пиццы..."/>

            {searchValue && <img src={iconClear} alt="iconClear" onClick={() => setSearchValue('')} className={style.clearIcon}/>}
        </div>
    );
};

