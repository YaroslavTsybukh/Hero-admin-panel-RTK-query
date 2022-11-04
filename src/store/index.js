import filters from "../components/heroesFilters/HeroesFiltersSlice"
import { configureStore } from "@reduxjs/toolkit";
import {apiSlice} from "../api/api"

const stringMiddleware = () => (dispatch) => (action) => {
    if(typeof action === "string"){
        return dispatch({type:action})
    }
    return dispatch(action)
}

const store = configureStore({
    reducer: {filters ,
        [apiSlice.reducerPath] : apiSlice.reducer},
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleware , apiSlice.middleware)
})

export default store