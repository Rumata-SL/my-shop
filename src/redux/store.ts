import {configureStore} from '@reduxjs/toolkit'
import {filterSlice} from "./slice/filterSlice";
import {pizzasSlice} from "./slice/pizzasSlice";
import {cartSlice} from "./slice/cartSlice";
import { useDispatch } from 'react-redux'

export const store = configureStore({
    reducer: {
        filter: filterSlice.reducer,
        pizzas: pizzasSlice.reducer,
        cart:cartSlice.reducer,
    },
})

/*export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})*/
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store