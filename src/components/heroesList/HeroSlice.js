import {createSlice, current, createAsyncThunk, createEntityAdapter, createSelector} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";

const heroesAdapter = createEntityAdapter()
const initialState = heroesAdapter.getInitialState({
    heroesLoading: "idle"
})


export const fetchHeroes = createAsyncThunk(
    "heroes/fetch",
    () => {
        const {request} = useHttp()
        return request("http://localhost:3001/heroes")
    }
)

const heroSlice = createSlice({
    name: "heroes",
    initialState,
    reducers: {
        heroDeleted : (state , action) => {
            heroesAdapter.removeOne(state , action.payload)
        },
        heroCreated : (state , action) => {
            heroesAdapter.addOne(state , action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending , state => {
            state.heroesLoading = "loading"
        })
            .addCase(fetchHeroes.fulfilled , (state,action) => {
                state.heroesLoading = 'idle'
                heroesAdapter.setAll(state , action.payload)
            })
            .addCase(fetchHeroes.rejected , state => {
                state.heroesLoading = "error"
            })
            .addDefaultCase((state,action) => {})
    }
})

const {selectAll} = heroesAdapter.getSelectors(state => state.heroes)
export const filteredHeroSelector = createSelector(
    selectAll,
    state => state.filters.filterActive,
    (heroes , filterActive) => {
        if(filterActive === "all"){
            return heroes
        }else{
            return heroes.filter(hero => hero.element === filterActive)
        }
    }
)

const {reducer , actions} = heroSlice

export default reducer

export const {
    heroesFetching,
    heroesFetched,
    heroesFetchedError,
    heroDeleted,
    heroCreated
} = actions