import React from 'react';
import style from "./Serch.module.scss"
import iconSearch from "./iconSearch.svg"
import iconClear from "./iconClear.svg"

export const Search = (props) => {
    const {searchValue, setSearchValue} = props
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

