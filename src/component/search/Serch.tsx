import React, {ChangeEvent, useCallback, useRef, useState} from "react";
import style from "./Serch.module.scss"
import iconSearch from "./iconSearch.svg"
import iconClear from "./iconClear.svg"
import debounce from "lodash.debounce"
import {useDispatch, useSelector} from "react-redux";
import {selectsearchValue, setSearchValue} from "../../redux/slice/filterSlice";
import {useAppDispatch} from "../../redux/store";

export const Search = () => {
    const [value, setValue] = useState("")
    const dispatch = useAppDispatch()
    const searchValue = useSelector(selectsearchValue)
    const inputRef = useRef<HTMLInputElement>(null)

    const onClickClear = () => {
        dispatch(setSearchValue(''))
        setValue("")
        /*if(inputRef.current) {
            inputRef.current.focus()
        }*/
        inputRef.current?.focus()
    }

    const updateSearchValue = useCallback(
        debounce((str:string) => {
            dispatch(setSearchValue(str))
        }, 1000), []
    )
    const onChangeInput = (event:ChangeEvent<HTMLInputElement>) => {
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

