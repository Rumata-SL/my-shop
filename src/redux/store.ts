import { useDispatch } from 'react-redux';
import {cartSlice} from "./slice/cartSlice";
import {configureStore} from '@reduxjs/toolkit';
import {filterSlice} from "./slice/filterSlice";
import {pizzasSlice} from "./slice/pizzasSlice";

export const store = configureStore({
    reducer: {
        filter: filterSlice.reducer,
        pizzas: pizzasSlice.reducer,
        cart:cartSlice.reducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;