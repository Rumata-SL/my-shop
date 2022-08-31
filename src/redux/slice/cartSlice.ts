import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../store";

export type CartItemType = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
}

type InitialStateType = {
    totalPrice: number
    items: Array<CartItemType>
}

const initialState: InitialStateType = {
    totalPrice: 0,
    items: [],

}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action:PayloadAction<CartItemType>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                });
            }
            state.totalPrice = state.items.reduce((acc, obj) => {
                return (obj.price * obj.count) + acc
            }, 0)
        },
        minusItem(state, action:PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload)
            if (findItem) {
                findItem.count--
            }
        },
        removeItem(state, action:PayloadAction<string>) {
            state.items = state.items.filter(i => i.id !== action.payload)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        }
    },
})

export const selectCart = (state:RootState) => state.cart;
export const selectCartItemById = (id:string) => (state:RootState) =>
    state.cart.items.find((obj: CartItemType) => obj.id === id);

export const {addItem, removeItem, minusItem, clearItems} = cartSlice.actions

