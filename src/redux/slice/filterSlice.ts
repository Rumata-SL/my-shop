import {RootState} from "../store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {SortPropertyEnum} from "../../component/sort/Sort";

export type SortType = {
    name: string
    sortProperty: SortPropertyEnum
}
type InitialStatetype = {
    searchValue: string
    categoryId: number
    currentPage: number
    sort: SortType
}

const initialState: InitialStatetype = {
    searchValue: "",
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: "популярности",
        sortProperty: SortPropertyEnum.RATING_ASC
    }
}

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setCategoryId: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload
        },
        setSortType: (state, action: PayloadAction<SortType>) => {
            state.sort = action.payload
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setFilters: (state, action: PayloadAction<InitialStatetype>) => {
            state.sort = action.payload.sort;
            state.currentPage = Number(action.payload.currentPage);
            state.categoryId = Number(action.payload.categoryId)
        }

    },
})

export const selectFilter = (state: RootState) => state.filter;
export const selectFilterSort = (state: RootState) => state.filter.sort;
export const selectsearchValue = (state: RootState) => state.filter.searchValue

export const {
    setCategoryId,
    setSortType,
    setCurrentPage,
    setFilters,
    setSearchValue
} = filterSlice.actions

