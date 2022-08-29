import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    totalPrice: 0,
    item: [],

}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action){
            state.item.push(action.payload)
        },
        removeItem(state, action){
           state.item = state.item.filter(i=>i.id !== action.payload)
        },
        clearItems(state, action){
            state.item = []
        }
    },
})

export const {addItem,removeItem, clearItems} = cartSlice.actions

