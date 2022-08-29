import {configureStore} from '@reduxjs/toolkit'
import {filterSlice} from "./slice/filterSlice";
import {pizzasSlice} from "./slice/pizzasSlice";
import {cartSlice} from "./slice/cartSlice";

export const store = configureStore({
    reducer: {
        filter: filterSlice.reducer,
        pizzas: pizzasSlice.reducer,
        cart:cartSlice.reducer,
    },
})