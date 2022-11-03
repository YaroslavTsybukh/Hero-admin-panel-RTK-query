import heroes from "../components/heroesList/HeroSlice";
import filters from "../components/heroesFilters/HeroesFiltersSlice"
import { configureStore } from "@reduxjs/toolkit";

const stringMiddleware = () => (dispatch) => (action) => {
    if(typeof action === "string"){
        return dispatch({type:action})
    }
    return dispatch(action)
}

const store = configureStore({
    reducer: {heroes , filters},
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleware)
})

export default store