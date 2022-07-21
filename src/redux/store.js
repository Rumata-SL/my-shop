import {configureStore} from '@reduxjs/toolkit'
import {filterSlice} from "./slice/filterSlice";
import {pizzasSlice} from "./slice/pizzasSlice";

export const store = configureStore({
    reducer: {
        filter: filterSlice,
        pizzas: pizzasSlice,
    },
})