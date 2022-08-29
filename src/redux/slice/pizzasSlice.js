import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params) => {
    const {sortBy, order, category, search, currentPage} = params
    const url = "https://62d57f1515ad24cbf2c86df6.mockapi.io/items?"
    const {data} = await axios.get(`${url}page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`)
    return data
})

const initialState = {
    items: [],
    status: 'loading'
}

export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload
        },
    },
    extraReducers: {
        [fetchPizzas.pending]:(state)=>{
            state.status = 'loading'
            state.items = []
        },
        [fetchPizzas.fulfilled]:(state, action)=>{
            state.items = action.payload;
            state.status = 'success'
        },
        [fetchPizzas.rejected]:(state)=>{
            state.status = 'error'
            state.items = []
        }
    }
})

export const {setItems} = pizzasSlice.actions

// export default pizzasSlice.reducer