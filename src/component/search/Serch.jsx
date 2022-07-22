import React, {useCallback, useContext, useRef, useState} from 'react';
import style from "./Serch.module.scss"
import iconSearch from "./iconSearch.svg"
import iconClear from "./iconClear.svg"
import {SearchContext} from "../../App";
import debounce from "lodash.debounce"

export const Search = () => {
    const [value, setValue] = useState("")
    const {setSearchValue} = useContext(SearchContext)
    const inputRef = useRef()

    const onClickClear = () => {
        setSearchValue("")
        setValue("")
        inputRef.current.focus()
    }

    const updateSearchValue = useCallback(
        debounce((str) => {
            setSearchValue(str)
        }, 1000), []
    )
    const onChangeInput = (event) => {
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    }

    return (
        <div className={style.root}>
            <img className={style.icon} src={iconSearch} alt="iconSearch"/>

            <input value={value}
                   ref={inputRef}
                   onChange={onChangeInput}
                   className={style.input} type="text"
                   placeholder="Поиск пиццы..."/>

            {value &&
                <img src={iconClear} alt="iconClear" onClick={onClickClear}
                     className={style.clearIcon}/>}
        </div>
    );
};

