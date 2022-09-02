import {RootState} from "../store";
import {getCartFromLS} from "../../utils/getCatrFromLS";
import {calcTotalPrice} from "../../utils/calcTotalPrice";
import {createSlice, PayloadAction} from "@reduxjs/toolkit"

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

const {items, totalPrice} = getCartFromLS()

const initialState: InitialStateType = {
    totalPrice: totalPrice,
    items: items,

}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItemType>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                });
            }
            state.totalPrice = calcTotalPrice(state.items)
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload)
            if (findItem) {
                findItem.count--
            }
            state.totalPrice = calcTotalPrice(state.items)
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(i => i.id !== action.payload)
            state.totalPrice = calcTotalPrice(state.items)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        }
    },
})

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
    state.cart.items.find((obj: CartItemType) => obj.id === id);

export const {addItem, removeItem, minusItem, clearItems} = cartSlice.actions

