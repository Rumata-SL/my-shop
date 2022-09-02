import axios from "axios";
import {RootState} from "../store";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type SearchPizzaParams = {
    sortBy: string;
    order: string;
    category: string;
    search: string;
    currentPage: string;
};

export const fetchPizzas = createAsyncThunk<Array<PizzaType>, SearchPizzaParams>("pizzas/fetchPizzasStatus", async (params) => {
    const {sortBy, order, category, search, currentPage} = params
    const url = "https://62d57f1515ad24cbf2c86df6.mockapi.io/items?"
    const {data} = await axios.get<Array<PizzaType>>(`${url}page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`)
    return data
})

type PizzaType = {
    id: string
    imageUrl: string
    title: string
    types: Array<number>
    sizes: Array<number>
    price: number
    category: number
    rating: number
}
type InitialStateType = {
    items: Array<PizzaType>
    status: "loading" | "success" | "error"
}
const initialState: InitialStateType = {
    items: [],
    status: "loading"
}

export const pizzasSlice = createSlice({
    name: "pizzas",
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<Array<PizzaType>>) => {
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = "loading"
            state.items = []
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = "success"

        });
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = "error"
            state.items = []
        });
    },
})

export const selectPizza = (state: RootState) => state.pizzas
export const {setItems} = pizzasSlice.actions